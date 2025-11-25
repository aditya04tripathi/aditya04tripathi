import {
	ClockIcon,
	ShieldCheckIcon,
	SparklesIcon,
	TargetIcon,
	UsersIcon,
	ZapIcon,
} from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
	{
		icon: ZapIcon,
		title: "Fast Delivery",
		description:
			"Efficient development process ensuring timely project completion without compromising quality.",
	},
	{
		icon: ShieldCheckIcon,
		title: "Quality Code",
		description:
			"Clean, maintainable, and well-documented code following industry best practices and standards.",
	},
	{
		icon: ClockIcon,
		title: "24/7 Support",
		description:
			"Ongoing maintenance and support to keep your application running smoothly at all times.",
	},
	{
		icon: TargetIcon,
		title: "Goal-Oriented",
		description:
			"Focused on understanding your business objectives and delivering solutions that drive results.",
	},
	{
		icon: UsersIcon,
		title: "Collaborative",
		description:
			"Strong communication skills and experience working with cross-functional teams to deliver exceptional results.",
	},
	{
		icon: SparklesIcon,
		title: "Innovative Solutions",
		description:
			"Leveraging cutting-edge technologies and creative problem-solving to build modern, scalable applications.",
	},
];

export function WhyChooseSection() {
	return (
		<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
			<h2 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
				Why Choose Me?
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				{highlights.map((item) => (
					<Card key={item.title}>
						<CardHeader>
							<div className="flex items-center gap-3 mb-2">
								<div className="rounded-lg bg-primary/10 p-2">
									<item.icon className="size-5 text-primary" />
								</div>
								<CardTitle className="text-lg">{item.title}</CardTitle>
							</div>
							<CardDescription>{item.description}</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
		</section>
	);
}

