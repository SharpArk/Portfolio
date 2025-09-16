// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  prefetch: true,
  integrations: [react()],

  env: {
    schema: {
      ADMIN_PASSWORD: envField.string({ context: "server", access: "secret" }),
      DOMAIN: envField.string({ context: "client", access: "public" }),
    },
  },

  adapter: vercel(),
});
