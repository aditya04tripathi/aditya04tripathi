import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://adityatripathi.dev",
  integrations: [svelte(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "src"),
      },
    },
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
  },
});
