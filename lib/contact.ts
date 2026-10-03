export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  subject: 160,
  body: 5000,
  requestBytes: 32768,
} as const

export type ContactInput = {
  name: string
  email: string
  subject: string
  body: string
}

export type ContactValidation =
  { valid: true; value: ContactInput } | { valid: false; error: string }

export function isContactEmail(value: string) {
  if (value.length > CONTACT_LIMITS.email) return false
  const parts = value.split("@")
  if (parts.length !== 2 || parts[0].length > 64) return false
  if (
    parts[0].startsWith(".") ||
    parts[0].endsWith(".") ||
    parts[0].includes("..")
  ) {
    return false
  }
  return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(
    value
  )
}

export function validateContactInput(input: unknown): ContactValidation {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { valid: false, error: "Please complete the contact form." }
  }

  const fields = input as Record<string, unknown>
  if (
    typeof fields.name !== "string" ||
    typeof fields.email !== "string" ||
    typeof fields.body !== "string" ||
    (fields.subject !== undefined && typeof fields.subject !== "string") ||
    (fields.company !== undefined && typeof fields.company !== "string")
  ) {
    return {
      valid: false,
      error: "Please check the form fields and try again.",
    }
  }

  if (typeof fields.company === "string" && fields.company.trim()) {
    return { valid: false, error: "Unable to send this message." }
  }

  const name = fields.name.trim()
  const email = fields.email.trim()
  const subject =
    typeof fields.subject === "string" ? fields.subject.trim() : ""
  const body = fields.body.trim()

  if (
    !name ||
    name.length > CONTACT_LIMITS.name ||
    /[\r\n\u0000-\u001f\u007f]/.test(name)
  ) {
    return {
      valid: false,
      error: "Please enter a name of 120 characters or fewer.",
    }
  }
  if (!isContactEmail(email)) {
    return { valid: false, error: "Please enter a valid email address." }
  }
  if (
    subject.length > CONTACT_LIMITS.subject ||
    /[\r\n\u0000-\u001f\u007f]/.test(subject)
  ) {
    return {
      valid: false,
      error: "Please keep the subject to 160 characters or fewer.",
    }
  }
  if (!body || body.length > CONTACT_LIMITS.body || /\u0000/.test(body)) {
    return {
      valid: false,
      error: "Please enter a message of 5,000 characters or fewer.",
    }
  }

  return { valid: true, value: { name, email, subject, body } }
}
