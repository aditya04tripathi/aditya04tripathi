const STORAGE_KEY = "theme";

export type ThemeMode = "dark" | "light";

export const themeState = $state<{ mode: ThemeMode }>({ mode: "dark" });

function readStored(): ThemeMode {
	if (typeof localStorage === "undefined") return "dark";
	const v = localStorage.getItem(STORAGE_KEY);
	if (v === "light" || v === "dark") return v;
	return "dark";
}

export function applyTheme(mode: ThemeMode) {
	document.documentElement.classList.toggle("dark", mode === "dark");
}

export function initTheme() {
	themeState.mode = readStored();
	applyTheme(themeState.mode);
}

export function toggleTheme() {
	themeState.mode = themeState.mode === "dark" ? "light" : "dark";
	localStorage.setItem(STORAGE_KEY, themeState.mode);
	applyTheme(themeState.mode);
}
