module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-var-requires": 0,
    "no-mixed-requires": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "arrow-parens": "off",
    "arrow-body-style": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // "comma-dangle": [2, "only-multiline"],
  },
};
