import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { defineConfig } from "rollup";

export default defineConfig({
  input: {
    content: "src/content.tsx",
    background: "src/background.ts",
    popup: "src/TranslationPopup.tsx",
  },
  output: {
    dir: "dist",
    format: "esm",
    entryFileNames: "[name].js",
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    resolve(),
    commonjs(),
  ],
  external: ["react", "react-dom"],
});
