module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-console": "error",
    semi: ["error", "always"],
    indent: ["error", 4],
    quotes: ["error", "single"],
  },
};
