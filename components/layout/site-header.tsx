"use client";

import { GithubIcon, LinkedinIcon, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CREATOR_INFO } from "@/lib/constants";

export function SiteHeader() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Prevent scrolling when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-6 pointer-events-none">
			<div className="w-full max-w-5xl flex items-center justify-between">
				<motion.div
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
					className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border/40 px-4 py-2 shadow-sm flex items-center gap-3 hover:scale-105 transition-transform duration-300 relative z-50"
				>
					<Link
						href="/"
						className="flex items-center gap-3 group"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						<Avatar className="h-9 w-9 border border-border/50">
							<AvatarImage src={CREATOR_INFO.avatar} className="object-cover" />
							<AvatarFallback>{CREATOR_INFO.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col pr-2">
							<span className="font-mono font-bold text-sm leading-none tracking-tight">
								{CREATOR_INFO.name}
							</span>
							<span className="text-[10px] text-muted-foreground font-mono leading-none mt-0.5 group-hover:text-primary transition-colors">
								Software Engineer
							</span>
						</div>
					</Link>
				</motion.div>

				{/* Mobile Menu Toggle */}
				<div className="pointer-events-auto md:hidden relative z-50">
					<Button
						variant="outline"
						size="icon"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="bg-background/80 backdrop-blur-md border-border/40"
					>
						{isMobileMenuOpen ? (
							<X className="size-5" />
						) : (
							<Menu className="size-5" />
						)}
					</Button>
				</div>

				{/* Desktop Navigation Pill */}
				<motion.div
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
					className="hidden md:flex pointer-events-auto bg-background/80 backdrop-blur-md border border-border/40 px-2 py-1.5 shadow-sm items-center gap-1"
				>
					<Link href="/projects">
						<Button
							variant="ghost"
							size="sm"
							className="font-mono text-xs hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
						>
							Projects
						</Button>
					</Link>
					<Link href="/engineering">
						<Button
							variant="ghost"
							size="sm"
							className="font-mono text-xs hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
						>
							Engineering
						</Button>
					</Link>

					<div className="w-px h-4 bg-border/50 mx-1" />

					<Link href={CREATOR_INFO.github} target="_blank">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
						>
							<GithubIcon className="size-4" />
						</Button>
					</Link>
					<Link href={CREATOR_INFO.linkedin} target="_blank">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
						>
							<LinkedinIcon className="size-4" />
						</Button>
					</Link>
					<Link href="/contact">
						<Button
							size="sm"
							className="h-8 px-4 text-xs font-mono font-bold ml-1 transition-all duration-300 hover:scale-105 hover:shadow-md"
						>
							Contact
						</Button>
					</Link>
				</motion.div>
			</div>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.2 }}
						className="absolute inset-0 top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center pointer-events-auto md:hidden"
					>
						<nav className="flex flex-col items-center gap-6 p-6">
							<Link href="/projects" onClick={() => setIsMobileMenuOpen(false)}>
								<span className="text-2xl font-mono font-bold hover:text-primary transition-colors">
									Projects
								</span>
							</Link>
							<Link
								href="/engineering"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<span className="text-2xl font-mono font-bold hover:text-primary transition-colors">
									Engineering
								</span>
							</Link>
							<Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
								<span className="text-2xl font-mono font-bold hover:text-primary transition-colors">
									Contact
								</span>
							</Link>

							<div className="w-16 h-px bg-border my-4" />

							<div className="flex items-center gap-6">
								<Link href={CREATOR_INFO.github} target="_blank">
									<GithubIcon className="size-6 text-muted-foreground hover:text-foreground transition-colors" />
								</Link>
								<Link href={CREATOR_INFO.linkedin} target="_blank">
									<LinkedinIcon className="size-6 text-muted-foreground hover:text-foreground transition-colors" />
								</Link>
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
