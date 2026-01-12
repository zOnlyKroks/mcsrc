import react from "@vitejs/plugin-react";
import { comlink } from "vite-plugin-comlink";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
    plugins: [comlink(), react()],
    worker: {
        plugins: () => [comlink()],
        format: "es",
    },
    test: {
        exclude: ["**/node_modules/**", "**/dist/**", "tests/**"],
    },
    // For javadoc API during development
    server: {
        proxy: {
            "/v1": {
                target: "http://localhost:8080",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    inheritance: ["@xyflow/react", "dagre"],
                },
            },
        },
    },
});
