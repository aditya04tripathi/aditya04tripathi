import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const engineering = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/engineering" }),
	schema: z.object({
		title: z.string(),
		category: z.string(),
		date: z.coerce.date(),
		summary: z.string(),
		decision: z.string(),
		tradeoffs: z.array(z.string()),
	}),
});

export const collections = { engineering };
