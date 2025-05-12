import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Désactivaton des warnings sur les `any`
      'react/no-unescaped-entities': 'off', // Désactivaton des warning lier aux apostrophes '
      '@typescript-eslint/no-unused-expressions': 'off', // Désactivaton des warning lier au &&
    },
  },
];

export default eslintConfig;
