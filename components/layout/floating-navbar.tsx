"use client";

import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CREATOR_INFO } from "@/lib/constants";

export function FloatingNavbar() {
	const { scrollY } = useScroll();
	const [isVisible, setIsVisible] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() ?? 0;
		if (latest > 250) {
			setIsVisible(true);
		} else if (latest < 200) {
			setIsVisible(false);
		}
	});

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -100, opacity: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className="fixed top-4 left-0 right-0 z-50 hidden md:flex justify-center px-4 pointer-events-none"
				>
					<div className="bg-background/80 backdrop-blur-md border border-border shadow-lg rounded-none px-4 py-2 flex items-center gap-4 pointer-events-auto max-w-2xl w-full justify-between">
						<div className="flex items-center gap-3">
							<motion.div
								layoutId="hero-avatar"
								className="relative h-10 w-10 overflow-hidden rounded-none"
							>
								<Avatar className="h-full w-auto aspect-square">
									<AvatarImage src={CREATOR_INFO.avatar} />
									<AvatarFallback>{CREATOR_INFO.name.charAt(0)}</AvatarFallback>
								</Avatar>
							</motion.div>
							<motion.div layoutId="hero-name" className="flex flex-col">
								<span className="font-mono font-bold text-sm leading-none">
									{CREATOR_INFO.name}
								</span>
								<span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
									Online
								</span>
							</motion.div>
						</div>

						<div className="flex items-center gap-2">
							<Link
								href={CREATOR_INFO.github}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 rounded-none"
								>
									<GithubIcon className="size-4" />
								</Button>
							</Link>
							<Link
								href={CREATOR_INFO.linkedin}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 rounded-none"
								>
									<LinkedinIcon className="size-4" />
								</Button>
							</Link>
							<Link href="/contact">
								<Button
									size="sm"
									className="rounded-none h-8 px-4 text-xs font-mono font-bold"
								>
									Contact
								</Button>
							</Link>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
