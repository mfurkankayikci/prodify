import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Global fonksiyonları etkinleştir
    environment: "jsdom", // jsdom ortamını ayarla
    setupFiles: "./src/setupTests.js", // Ayar dosyanızı ekleyin
  },
});
