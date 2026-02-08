import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            // Utilise SWC pour des builds plus rapides (déjà inclus par défaut dans Vite 5)
            jsxRuntime: "automatic",
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@components": fileURLToPath(
                new URL("./src/components", import.meta.url)
            ),
            "@contexts": fileURLToPath(
                new URL("./src/contexts", import.meta.url)
            ),
            "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
            "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
            "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
        },
    },
    build: {
        // Optimisation pour la production
        target: "es2015",
        minify: "esbuild",
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Séparation des vendors pour un meilleur caching
                    "react-vendor": ["react", "react-dom", "react-router-dom"],
                    "export-vendor": ["html2canvas", "jspdf"],
                },
            },
        },
        // Limite de warning pour les chunks (500 Ko selon SRS)
        chunkSizeWarningLimit: 500,
    },
    server: {
        port: 3000,
        open: true,
    },
});
