"use client";

import { SendIcon } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { sendContactEmail } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ContactFormState } from "@/lib/contact-form-state";
import { initialContactFormState } from "@/lib/contact-form-state";

const projectTypes = [
	"Full-stack Web App",
	"Marketing Website",
	"UI/UX Review",
	"Ongoing Development",
	"Other",
];

const budgetRanges = [
	"Under $3k",
	"$3k – $8k",
	"$8k – $15k",
	"$15k+",
	"Undecided",
];

const timelineOptions = [
	"Immediately",
	"Within 1 month",
	"Within 3 months",
	"Flexible",
];

export function ContactForm() {
	const [state, formAction] = useFormState<ContactFormState, FormData>(
		sendContactEmail,
		initialContactFormState,
	);
	const formRef = useRef<HTMLFormElement>(null);
	const baseId = useId();
	const fieldIds = useMemo(
		() => ({
			name: `${baseId}-name`,
			email: `${baseId}-email`,
			company: `${baseId}-company`,
			projectType: `${baseId}-project-type`,
			budget: `${baseId}-budget`,
			timeline: `${baseId}-timeline`,
			message: `${baseId}-message`,
		}),
		[baseId],
	);
	const [projectType, setProjectType] = useState("");
	const [budget, setBudget] = useState("");
	const [timeline, setTimeline] = useState("");

	useEffect(() => {
		if (state.status === "success") {
			toast.success(state.message ?? "Thanks! I’ll be in touch shortly.");
		} else if (state.status === "error") {
			toast.error(
				state.message ?? "Something went wrong. Please try again in a moment.",
			);
		}
	}, [state.status, state.message]);

	useEffect(() => {
		if (state.status === "success") {
			formRef.current?.reset();
			setProjectType("");
			setBudget("");
			setTimeline("");
		}
	}, [state.status]);

	return (
		<form
			ref={formRef}
			action={formAction}
			className="space-y-8 rounded-2xl border border-border bg-card/80 p-5 shadow-sm sm:p-6"
		>
			<div className="grid gap-5 sm:grid-cols-2">
				<Field label="Name *" htmlFor={fieldIds.name}>
					<Input
						id={fieldIds.name}
						name="name"
						type="text"
						autoComplete="name"
						required
						placeholder="Jane Doe"
					/>
				</Field>
				<Field label="Email *" htmlFor={fieldIds.email}>
					<Input
						id={fieldIds.email}
						name="email"
						type="email"
						autoComplete="email"
						required
						placeholder="you@example.com"
					/>
				</Field>
			</div>

			<div className="grid gap-5 sm:grid-cols-2">
				<Field label="Company" htmlFor={fieldIds.company}>
					<Input
						id={fieldIds.company}
						name="company"
						type="text"
						placeholder="Acme Inc."
					/>
				</Field>
				<Field label="Project Type" htmlFor={fieldIds.projectType}>
					<Select value={projectType} onValueChange={setProjectType}>
						<input type="hidden" name="projectType" value={projectType} />
						<SelectTrigger className="w-full" id={fieldIds.projectType}>
							<SelectValue placeholder="Select an option" />
						</SelectTrigger>
						<SelectContent>
							{projectTypes.map((type) => (
								<SelectItem key={type} value={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>
			</div>

			<div className="grid gap-5 sm:grid-cols-2">
				<Field label="Budget" htmlFor={fieldIds.budget}>
					<Select value={budget} onValueChange={setBudget}>
						<input type="hidden" name="budget" value={budget} />
						<SelectTrigger className="w-full" id={fieldIds.budget}>
							<SelectValue placeholder="Select an estimate" />
						</SelectTrigger>
						<SelectContent>
							{budgetRanges.map((range) => (
								<SelectItem key={range} value={range}>
									{range}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>
				<Field label="Timeline" htmlFor={fieldIds.timeline}>
					<Select value={timeline} onValueChange={setTimeline}>
						<input type="hidden" name="timeline" value={timeline} />
						<SelectTrigger className="w-full" id={fieldIds.timeline}>
							<SelectValue placeholder="When do you want to start?" />
						</SelectTrigger>
						<SelectContent>
							{timelineOptions.map((option) => (
								<SelectItem key={option} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label htmlFor={fieldIds.message}>Project Details *</Label>
					<span className="text-xs text-muted-foreground">
						Minimum 20 characters
					</span>
				</div>
				<Textarea
					id={fieldIds.message}
					name="message"
					required
					minLength={20}
					placeholder="Tell me about your goals, desired features, and success metrics..."
				/>
			</div>

			<div className="space-y-3">
				<SubmitButton />
				<p className="text-xs text-muted-foreground">
					I usually reply within 24–48 hours. Your details are kept private and
					secure.
				</p>
			</div>
		</form>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			className="w-full sm:w-auto"
			disabled={pending}
			size="lg"
			aria-busy={pending}
		>
			{pending ? (
				<span className="flex items-center gap-2">
					<span className="size-3 rounded-full border-2 border-t-transparent border-white animate-spin" />
					Sending…
				</span>
			) : (
				<span className="flex items-center gap-2">
					<SendIcon className="size-4" />
					Send message
				</span>
			)}
		</Button>
	);
}

type FieldProps = {
	label: string;
	htmlFor: string;
	children: React.ReactNode;
};

function Field({ label, htmlFor, children }: FieldProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={htmlFor}>{label}</Label>
			{children}
		</div>
	);
}
