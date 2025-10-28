"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps
	extends React.ComponentPropsWithoutRef<"button"> {
	duration?: number;
}

export const AnimatedThemeToggler = ({
	className,
	duration = 400,
	...props
}: AnimatedThemeTogglerProps) => {
	const { resolvedTheme, setTheme } = useTheme();
	const buttonRef = useRef<HTMLButtonElement>(null);

	const toggleTheme = useCallback(async () => {
		if (!buttonRef.current) return;

		const newTheme = resolvedTheme === "dark" ? "light" : "dark";

		await document.startViewTransition(() => {
			flushSync(() => {
				setTheme(newTheme);
				if (newTheme === "dark") {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			});
		}).ready;

		const { top, left, width, height } =
			buttonRef.current.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const maxRadius = Math.hypot(
			Math.max(left, window.innerWidth - left),
			Math.max(top, window.innerHeight - top),
		);

		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${maxRadius}px at ${x}px ${y}px)`,
				],
			},
			{
				duration,
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)",
			},
		);
	}, [resolvedTheme, setTheme, duration]);

	return (
		<button
			ref={buttonRef}
			onClick={toggleTheme}
			className={cn(className)}
			{...props}
		>
			{resolvedTheme === "dark" ? (
				<Sun className={"w-4 h-4"} />
			) : (
				<Moon className={"w-4 h-4"} />
			)}
			<span className="sr-only">Toggle theme</span>
		</button>
	);
};
