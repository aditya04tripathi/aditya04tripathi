"use client";

import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CREATOR_INFO } from "@/lib/constants";

export function HeroSection() {
	return (
		<section className="pt-24 pb-24">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
				{/* Main Content */}
				<div className="lg:col-span-8 flex flex-col gap-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="flex items-center gap-3 mb-4">
							<span className="relative flex h-3 w-3">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
							</span>
							<span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
								System Online
							</span>
						</div>

						<h1 className="type-h1 mb-4">Aditya Tripathi</h1>
						<h2 className="type-h3 text-muted-foreground mb-6">
							Software Developer
						</h2>

						<p className="type-body max-w-2xl text-foreground/80 leading-relaxed">
							{CREATOR_INFO.bio}
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="flex flex-wrap gap-4 mt-2"
					>
						<Link href="/projects">
							<Button
								size="lg"
								className="rounded-none font-mono font-bold text-sm h-12 px-8 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
							>
								View Projects
							</Button>
						</Link>
						<Link href="/contact">
							<Button
								variant="outline"
								size="lg"
								className="rounded-none font-mono font-bold text-sm h-12 px-8 transition-all duration-300 hover:scale-105 hover:bg-secondary/50"
							>
								Contact Me
							</Button>
						</Link>
					</motion.div>
				</div>

				{/* Data Column (The "Dashboard" feel) */}
				<div className="lg:col-span-4 space-y-8 pt-2 lg:pt-14">
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="p-6 border border-border/60 bg-secondary/5 space-y-4"
					>
						<div className="space-y-1">
							<p className="type-small uppercase tracking-widest text-[10px]">
								Location
							</p>
							<p className="font-mono text-sm">{CREATOR_INFO.location}</p>
						</div>
						<div className="space-y-1">
							<p className="type-small uppercase tracking-widest text-[10px]">
								Education
							</p>
							<p className="font-mono text-sm">Monash University</p>
						</div>
						<div className="space-y-1">
							<p className="type-small uppercase tracking-widest text-[10px]">
								Core Stack
							</p>
							<div className="flex flex-wrap gap-1.5 pt-1">
								{["Next.js", "TypeScript", "PostgreSQL", "AWS"].map((tech) => (
									<Badge
										key={tech}
										variant="outline"
										className="rounded-none text-[10px] border-border/60"
									>
										{tech}
									</Badge>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
