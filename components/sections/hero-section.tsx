import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CREATOR_INFO } from "@/lib/constants";

export function HeroSection() {
	return (
		<div className="mb-8 sm:mb-10 md:mb-12">
			<div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
				<Avatar className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48">
					<AvatarImage src={CREATOR_INFO.avatar} />
					<AvatarFallback>
						{CREATOR_INFO.name
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</AvatarFallback>
				</Avatar>

				<div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left">
					<div>
						<h1 className="font-bold tracking-tight mb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
							{CREATOR_INFO.name}
						</h1>
						<p className="text-lg sm:text-xl text-muted-foreground">
							{CREATOR_INFO.title}
						</p>
					</div>

					<div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
						<div className="flex items-center gap-2">
							<MapPinIcon className="size-4" />
							<span>{CREATOR_INFO.location}</span>
						</div>
						<div className="flex items-center gap-2">
							<MailIcon className="size-4" />
							<Link
								href={`mailto:${CREATOR_INFO.email}`}
								className="hover:text-foreground transition-colors"
							>
								{CREATOR_INFO.email}
							</Link>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
						<Link
							href={CREATOR_INFO.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full sm:w-auto"
						>
							<Button variant="outline" className="w-full sm:w-auto">
								<LinkedinIcon className="size-4 mr-2" />
								LinkedIn
							</Button>
						</Link>
						<Link
							href={CREATOR_INFO.github}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full sm:w-auto"
						>
							<Button variant="outline" className="w-full sm:w-auto">
								<GithubIcon className="size-4 mr-2" />
								GitHub
							</Button>
						</Link>
						<Link href="/contact" className="w-full sm:w-auto">
							<Button className="w-full sm:w-auto">
								<MailIcon className="size-4 mr-2" />
								Start a project
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
