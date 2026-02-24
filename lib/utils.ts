import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge and normalize Tailwind CSS class names.
 *
 * This helper uses `clsx` to join conditional class values and `tailwind-merge`
 * to remove conflicting Tailwind utility classes (for example `p-2 p-4` => `p-4`).
 *
 * @param inputs - One or more class value inputs (strings, objects, arrays).
 * @returns A single, merged className string safe to pass to `className`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
