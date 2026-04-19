const STORAGE_KEY = "text-size";

export type TextSize = "small" | "normal" | "large";

export const textSizeState = $state<{ size: TextSize }>({ size: "normal" });

function applyTextSize(size: TextSize) {
	const root = document.documentElement;
	if (size === "small") root.style.fontSize = "85%";
	else if (size === "large") root.style.fontSize = "110%";
	else root.style.fontSize = "100%";
}

export function initTextSize() {
	if (typeof localStorage === "undefined") return;
	const stored = localStorage.getItem(STORAGE_KEY) as TextSize | null;
	if (stored === "small" || stored === "normal" || stored === "large") {
		textSizeState.size = stored;
	}
	applyTextSize(textSizeState.size);
}

export function setTextSize(size: TextSize) {
	textSizeState.size = size;
	localStorage.setItem(STORAGE_KEY, size);
	applyTextSize(size);
}
