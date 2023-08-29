/// <reference types="vitest" />
import {defineConfig} from "vite";

export default defineConfig({
    test: {
        include: ['./store/*.test.ts'],
        globals: true
    }
})