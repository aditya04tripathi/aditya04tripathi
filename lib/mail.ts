import nodemailer from "nodemailer";

let cachedTransporter: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const user = process.env.EMAIL_ADDR;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("Email credentials are not configured.");
  }

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  return cachedTransporter;
}
