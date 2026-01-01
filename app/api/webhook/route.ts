import { type NextRequest, NextResponse } from "next/server";
import { getTransporter } from "@/lib/mail";

type ErrorWebhookPayload = {
	message: string;
	error: string;
	stack?: string;
	severity: "low" | "medium" | "high" | "critical";
	context?: {
		userId?: string;
		screen?: string;
		action?: string;
		component?: string;
		metadata?: Record<string, unknown>;
	};
	userAgent?: string;
	platform?: string;
	appVersion?: string;
	timestamp?: string;
};

export async function POST(request: NextRequest) {
	try {
		const body: ErrorWebhookPayload = await request.json();

		const {
			message,
			error,
			stack,
			severity,
			context,
			userAgent,
			platform,
			appVersion,
			timestamp,
		} = body;

		if (!message || !error || !severity) {
			return NextResponse.json(
				{ error: "Missing required fields: message, error, severity" },
				{ status: 400 },
			);
		}

		const recipient =
			process.env.ERROR_EMAIL_TO ??
			process.env.EMAIL_TO ??
			process.env.EMAIL_ADDR;

		if (!recipient) {
			return NextResponse.json(
				{ error: "Error email recipient is not configured." },
				{ status: 500 },
			);
		}

		const transporter = getTransporter();

		const contextDetails = context
			? `
      <h3>Context:</h3>
      <ul>
        ${
					context.userId
						? `<li><strong>User ID:</strong> ${context.userId}</li>`
						: ""
				}
        ${
					context.screen
						? `<li><strong>Screen:</strong> ${context.screen}</li>`
						: ""
				}
        ${
					context.action
						? `<li><strong>Action:</strong> ${context.action}</li>`
						: ""
				}
        ${
					context.component
						? `<li><strong>Component:</strong> ${context.component}</li>`
						: ""
				}
        ${
					context.metadata
						? `<li><strong>Metadata:</strong> <pre>${JSON.stringify(
								context.metadata,
								null,
								2,
							)}</pre></li>`
						: ""
				}
      </ul>
    `
			: "";

		const stackTrace = stack
			? `
      <h3>Stack Trace:</h3>
      <pre>${stack}</pre>
    `
			: "";

		const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: ${
							severity === "critical"
								? "#dc2626"
								: severity === "high"
									? "#f59e0b"
									: severity === "medium"
										? "#3b82f6"
										: "#6b7280"
						}; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 5px 5px; }
            .severity-badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
            .severity-critical { background: #dc2626; color: white; }
            .severity-high { background: #f59e0b; color: white; }
            .severity-medium { background: #3b82f6; color: white; }
            .severity-low { background: #6b7280; color: white; }
             .severity-medium { background: #3b82f6; color: white; }
             .severity-low { background: #6b7280; color: white; }
            .info-item { margin: 10px 0; }
            .info-label { font-weight: bold; color: #6b7280; }
            pre { background: #1f2937; color: #f9fafb; padding: 15px; border-radius: 4px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">🚨 App Error Alert</h2>
              <span class="severity-badge severity-${severity}">${severity}</span>
            </div>
            <div class="content">
              <div class="info-item">
                <span class="info-label">Error Type:</span> ${error}
              </div>
              <div class="info-item">
                <span class="info-label">Message:</span> ${message}
              </div>
              ${
								platform
									? `<div class="info-item"><span class="info-label">Platform:</span> ${platform}</div>`
									: ""
							}
              ${
								appVersion
									? `<div class="info-item"><span class="info-label">App Version:</span> ${appVersion}</div>`
									: ""
							}
              ${
								timestamp
									? `<div class="info-item"><span class="info-label">Timestamp:</span> ${timestamp}</div>`
									: ""
							}
              ${
								userAgent
									? `<div class="info-item"><span class="info-label">User Agent:</span> ${userAgent}</div>`
									: ""
							}
              ${contextDetails}
              ${stackTrace}
            </div>
          </div>
        </body>
      </html>
    `;

		const emailText = `
🚨 App Error Alert - ${severity.toUpperCase()}

Error Type: ${error}
Message: ${message}
${platform ? `Platform: ${platform}\n` : ""}
${appVersion ? `App Version: ${appVersion}\n` : ""}
${timestamp ? `Timestamp: ${timestamp}\n` : ""}
${userAgent ? `User Agent: ${userAgent}\n` : ""}
${context ? `\nContext:\n${JSON.stringify(context, null, 2)}\n` : ""}
${stack ? `\nStack Trace:\n${stack}\n` : ""}
    `.trim();

		await transporter.sendMail({
			from: {
				name: "StorytimeGPT Error Monitor",
				address: process.env.EMAIL_ADDR as string,
			},
			to: recipient,
			subject: `🚨 ${severity.toUpperCase()} Error: ${error} - StorytimeGPT`,
			text: emailText,
			html: emailHtml,
		});

		return NextResponse.json(
			{ message: "Error logged and email sent successfully" },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: "Failed to process webhook",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
