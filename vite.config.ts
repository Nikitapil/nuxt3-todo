/// <reference types="vitest" />
import {defineConfig} from "vite";

export default defineConfig({
    test: {
        include: ['./store/*.test.ts', './src/*.test.ts'],
        globals: true
    }
})