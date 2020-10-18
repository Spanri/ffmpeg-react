module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },

  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["prettier"],
  rules: {
    "no-console": "error",
    "prettier/prettier": "error",
  },
};
