import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/landpage-T-G/",
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        logistica: "logistica/index.html",
        galpao: "galpao/index.html",
        ebikes: "e-bikes/index.html",
        energia: "energia-solar/index.html",
        carregadores: "carregadores/index.html",
        sobre: "sobre/index.html",
        contato: "contato/index.html",
      },
    },
  },
});
