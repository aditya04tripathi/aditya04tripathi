"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import LetterGlitch from "@/components/LetterGlitch";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>("system");
	const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") as Theme | null;
		if (storedTheme) {
			setThemeState(storedTheme);
		}
		setMounted(true);
	}, []);

	useEffect(() => {
		const updateResolvedTheme = () => {
			let resolved: "light" | "dark" = "light";

			if (theme === "system") {
				const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
				resolved = mediaQuery.matches ? "dark" : "light";
			} else {
				resolved = theme;
			}

			setResolvedTheme(resolved);

			const root = document.documentElement;
			if (resolved === "dark") {
				root.classList.add("dark");
			} else {
				root.classList.remove("dark");
			}
		};

		if (mounted) {
			updateResolvedTheme();

			if (theme === "system") {
				const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
				const handler = () => updateResolvedTheme();
				mediaQuery.addEventListener("change", handler);
				return () => mediaQuery.removeEventListener("change", handler);
			}
		}
	}, [theme, mounted]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	if (!mounted) {
		return null;
	}

	return (
		<ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
			<main className="z-0">{children}</main>
			<LetterGlitch
				characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
				glitchColors={["1c9cf0", "#0f1419", "#061622", "#17181c"]}
				glitchSpeed={50}
				centerVignette={true}
				outerVignette={false}
				smooth={true}
			/>
			<AnimatedThemeToggler className="bg-primary p-3 rounded-full fixed bottom-4 right-4 z-50" />
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
