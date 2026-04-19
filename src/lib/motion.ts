export function prefersReducedMotion(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type FlyInParams = {
	y?: number;
	x?: number;
	duration?: number;
	opacity?: number;
	delay?: number;
};

export function flyInParams(params: FlyInParams) {
	if (prefersReducedMotion()) {
		return { duration: 0, y: 0, x: 0, opacity: 1, delay: 0 };
	}
	return { y: 0, x: 0, opacity: 0, duration: 400, delay: 0, ...params };
}
