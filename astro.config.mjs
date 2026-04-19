import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://adityatripathi.dev",
  output: "static",
  adapter: node({
    mode: "standalone",
  }),
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 4321,
  },
  integrations: [svelte(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "src"),
      },
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
    },
    preview: {
      host: "0.0.0.0",
      allowedHosts: [
        "adityatripathi.dev",
        "www.adityatripathi.dev",
        ".adityatripathi.dev",
        "adityatripathi.up.railway.app",
        ".up.railway.app",
        ".railway.app",
        "localhost",
        "127.0.0.1",
      ],
    },
  },
});
