import "server-only"
import nodemailer from "nodemailer"
import { profile } from "@/data/portfolio"
import { isContactEmail, type ContactInput } from "@/lib/contact"

export type ContactMailConfiguration = {
  user: string
  password: string
  recipient: string
}

export function contactMailConfiguration(): ContactMailConfiguration | null {
  const user = process.env.GMAIL_SMTP_USER?.trim() ?? ""
  const password = process.env.GMAIL_SMTP_APP_PASSWORD?.replace(/\s/g, "") ?? ""
  const recipient = process.env.CONTACT_EMAIL?.trim() || profile.email
  if (!isContactEmail(user) || !password || !isContactEmail(recipient))
    return null
  return { user, password, recipient }
}

export function escapeContactHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }
    return entities[character]
  })
}

export function contactEmailContent(input: ContactInput) {
  const subject = input.subject || `Message from ${input.name}`
  const name = escapeContactHtml(input.name)
  const email = escapeContactHtml(input.email)
  const emailHref = escapeContactHtml(encodeURIComponent(input.email))
  const heading = escapeContactHtml(subject)
  const body = escapeContactHtml(input.body).replace(/\r?\n/g, "<br>")

  return {
    subject: `Portfolio: ${subject}`,
    text: `New portfolio message\n\nFrom: ${input.name}\nEmail: ${input.email}\nSubject: ${subject}\n\n${input.body}\n\nReply to this email to contact the sender.`,
    html: `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0c0e14;color:#f2f2f6;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0c0e14;padding:36px 16px;"><tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;background:#10131b;border:1px solid #293344;border-radius:6px;overflow:hidden;">
<tr><td style="padding:30px 32px;border-bottom:1px solid #293344;"><span style="font-size:26px;font-weight:bold;color:#f2f2f6;">AT<span style="color:#8ab9ff;">.</span></span><p style="margin:14px 0 0;color:#8ab9ff;font-size:11px;letter-spacing:2px;">A NEW CONNECTION / PORTFOLIO MESSAGE</p></td></tr>
<tr><td style="padding:32px;"><h1 style="margin:0 0 24px;font-size:26px;line-height:1.3;color:#f2f2f6;">${heading}</h1>
<p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:#a0a4b1;">From <strong style="color:#f2f2f6;">${name}</strong></p>
<p style="margin:0 0 28px;font-size:14px;line-height:1.7;"><a href="mailto:${emailHref}" style="color:#8ab9ff;text-decoration:none;">${email}</a></p>
<div style="padding:24px;background:#0c0e14;border:1px solid #293344;border-radius:4px;color:#f2f2f6;font-size:15px;line-height:1.8;overflow-wrap:anywhere;">${body}</div>
<p style="margin:28px 0 0;font-size:13px;line-height:1.7;color:#a0a4b1;">Reply to this email to continue the conversation with ${name}.</p></td></tr>
<tr><td style="padding:22px 32px;border-top:1px solid #293344;color:#a0a4b1;font-size:11px;line-height:1.8;">ADITYA TRIPATHI / SOFTWARE ENGINEER<br><a href="https://adityatripathi.dev" style="color:#8ab9ff;text-decoration:none;">adityatripathi.dev</a></td></tr>
</table></td></tr></table></body></html>`,
  }
}

export async function sendContactEmail(
  input: ContactInput,
  configuration: ContactMailConfiguration
) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: configuration.user, pass: configuration.password },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    dnsTimeout: 10000,
    disableFileAccess: true,
    disableUrlAccess: true,
  })

  try {
    const result = await transport.sendMail({
      from: { name: "Aditya Tripathi Portfolio", address: configuration.user },
      to: configuration.recipient,
      replyTo: { name: input.name, address: input.email },
      ...contactEmailContent(input),
      disableFileAccess: true,
      disableUrlAccess: true,
    })
    const accepted = result.accepted.some(
      (address) =>
        address.toLowerCase() === configuration.recipient.toLowerCase()
    )
    if (!accepted) throw new Error("Contact recipient was not accepted")
  } finally {
    transport.close()
  }
}
