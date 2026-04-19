let lockCount = 0;

export function lockBodyScroll(): void {
	if (typeof document === "undefined") return;
	if (lockCount === 0) {
		document.body.style.overflow = "hidden";
	}
	lockCount++;
}

export function unlockBodyScroll(): void {
	if (typeof document === "undefined") return;
	lockCount = Math.max(0, lockCount - 1);
	if (lockCount === 0) {
		document.body.style.overflow = "";
	}
}
