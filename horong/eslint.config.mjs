// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["node_modules", "dist"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
      ecmaVersion: 2020,
    },
  }
);
