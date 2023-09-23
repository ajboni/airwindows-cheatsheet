import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Airwindows Cheatsheet",
        short_name: "Airwindows Cheatsheet",
        description:
          "Cheatsheet for Airwindows plugins. This project aims to build an automated frontend for the airwindopedia documentation file.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "pwa-64x64.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "https://airwindowscheatsheet.aboni.dev/",
});
