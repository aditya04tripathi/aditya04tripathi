import { CONTACT_LIMITS, validateContactInput } from "@/lib/contact"
import { contactMailConfiguration, sendContactEmail } from "@/lib/contact-mail"
import { seo } from "@/data/seo"

export const runtime = "nodejs"

const rateWindow = 10 * 60 * 1000
const attempts = new Map<string, { count: number; expires: number }>()
let processAttempts = { count: 0, expires: 0 }

function rateLimit(key: string) {
  const now = Date.now()
  if (processAttempts.expires <= now) {
    processAttempts = { count: 0, expires: now + rateWindow }
  }
  if (processAttempts.count >= 30) {
    return Math.max(1, Math.ceil((processAttempts.expires - now) / 1000))
  }
  for (const [address, value] of attempts) {
    if (value.expires <= now) attempts.delete(address)
  }
  const previous = attempts.get(key)
  if (previous && previous.count >= 5) {
    return Math.max(1, Math.ceil((previous.expires - now) / 1000))
  }
  if (!previous && attempts.size >= 4096) return 60
  processAttempts.count += 1
  attempts.set(key, {
    count: (previous?.count ?? 0) + 1,
    expires: previous?.expires ?? now + rateWindow,
  })
  return 0
}

function reply(
  error: string,
  status: number,
  headers?: Record<string, string>
) {
  return Response.json({ error }, { status, headers })
}

async function readBody(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") || 0)
  if (declaredLength > CONTACT_LIMITS.requestBytes) return null
  const reader = request.body?.getReader()
  if (!reader) return ""
  const decoder = new TextDecoder()
  let length = 0
  let content = ""
  try {
    while (true) {
      const chunk = await reader.read()
      if (chunk.done) break
      length += chunk.value.byteLength
      if (length > CONTACT_LIMITS.requestBytes) {
        await reader.cancel()
        return null
      }
      content += decoder.decode(chunk.value, { stream: true })
    }
    return content + decoder.decode()
  } finally {
    reader.releaseLock()
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  if (origin) {
    try {
      const caller = new URL(origin)
      const host = request.headers.get("host") || new URL(request.url).host
      const allowedOrigins = [new URL(seo.url).origin]
      if (process.env.CONTACT_ALLOWED_ORIGIN) {
        allowedOrigins.push(new URL(process.env.CONTACT_ALLOWED_ORIGIN).origin)
      }
      if (
        !["http:", "https:"].includes(caller.protocol) ||
        (!allowedOrigins.includes(caller.origin) &&
          caller.host.toLowerCase() !== host.toLowerCase())
      ) {
        return reply("Please send your message from the contact page.", 403)
      }
    } catch {
      return reply("Please send your message from the contact page.", 403)
    }
  }
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    return reply("Please submit the contact form as JSON.", 415)
  }

  let input: unknown
  try {
    const body = await readBody(request)
    if (body === null) return reply("This message is too large.", 413)
    input = JSON.parse(body)
  } catch {
    return reply("Please check the form and try again.", 400)
  }

  const validation = validateContactInput(input)
  if (!validation.valid) return reply(validation.error, 400)
  const configuration = contactMailConfiguration()
  if (!configuration) {
    return reply(
      "The form is temporarily unavailable. Please email me@adityatripathi.dev directly.",
      503
    )
  }

  const address =
    request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      .trim()
      .slice(0, 128) || "unknown"
  const retryAfter = rateLimit(address)
  if (retryAfter) {
    return reply(
      "Please wait a few minutes before sending another message.",
      429,
      { "Retry-After": String(retryAfter) }
    )
  }

  try {
    await sendContactEmail(validation.value, configuration)
    return Response.json({
      message: "Message sent. Thank you for reaching out.",
    })
  } catch {
    console.error("Contact email delivery failed")
    return reply(
      "Your message could not be sent. Please try again or email me@adityatripathi.dev directly.",
      502
    )
  }
}
