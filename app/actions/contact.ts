"use server";

import nodemailer from "nodemailer";
import type { ContactFormState } from "@/lib/contact-form-state";

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
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

function validateEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function sendContactEmail(
	prevState: ContactFormState,
	formData: FormData,
): Promise<ContactFormState> {
	const name = formData.get("name")?.toString().trim();
	const email = formData.get("email")?.toString().trim();
	const company = formData.get("company")?.toString().trim();
	const projectType = formData.get("projectType")?.toString().trim();
	const budget = formData.get("budget")?.toString().trim();
	const timeline = formData.get("timeline")?.toString().trim();
	const message = formData.get("message")?.toString().trim();

	if (!name) {
		return {
			status: "error",
			message: "Please provide your name.",
		};
	}

	if (!email || !validateEmail(email)) {
		return {
			status: "error",
			message: "Please provide a valid email.",
		};
	}

	if (!message || message.length < 20) {
		return {
			status: "error",
			message: "Message should be at least 20 characters long.",
		};
	}

	const recipient = process.env.EMAIL_TO ?? process.env.EMAIL_ADDR;

	if (!recipient) {
		return {
			status: "error",
			message: "Email recipient is not configured.",
		};
	}

	try {
		const transporter = getTransporter();

		await transporter.sendMail({
			from: {
				name,
				address: process.env.EMAIL_ADDR as string,
			},
			to: recipient,
			replyTo: email,
			subject: `Portfolio Inquiry${projectType ? ` - ${projectType}` : ""}`,
			text: [
				`Name: ${name}`,
				`Email: ${email}`,
				company && `Company: ${company}`,
				projectType && `Project type: ${projectType}`,
				budget && `Budget: ${budget}`,
				timeline && `Timeline: ${timeline}`,
				"",
				"Message:",
				message,
			]
				.filter(Boolean)
				.join("\n"),
			html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        ${projectType ? `<p><strong>Project type:</strong> ${projectType}</p>` : ""}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ""}
        ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
		});

		return {
			status: "success",
			message:
				"Thanks for reaching out! I’ll get back to you within 1–2 business days.",
		};
	} catch (error) {
		console.error("Contact form error:", error);
		return {
			status: "error",
			message:
				"Something went wrong while sending your message. Please try again later.",
		};
	}
}
