import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "test-results/**",
      "playwright-report/**",
      "coverage/**",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
