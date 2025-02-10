import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "lib",
    sourcemap: true,
    clean: true,
    dts: true,
    format: ["esm", "cjs"],
});
