/** @type {import("prettier").Config} */
const config = {
  singleQuote: false,
  semi: true,
  tabWidth: 2,
  printWidth: 80,
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  cursorOffset: -1,
  embeddedLanguageFormatting: "auto",
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "strict",
  insertPragma: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "es5",
  useTabs: false,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
