import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Output both CommonJS and ESM formats
  // dts: true, // Generate declaration files
  splitting: false,
  sourcemap: true,
  clean: true,
  target: "es2018", // Compatible with modern browsers and Node
  outDir: "dist",
  // Handle platform-specific code if needed
  esbuildOptions(options) {
    options.conditions = ["node", "import"];
  },
});
