import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  return {
    base:
      command === "build" ? "/React_KGING_Sports-and-health_E-commerce/" : "/",
    plugins: [react()],
  };
});
