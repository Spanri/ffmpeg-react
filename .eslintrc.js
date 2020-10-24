module.exports = {
  parser: "babel-eslint",
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true,
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
    "comma-dangle": 0,
    "no-unexpected-multiline": "warn",
    "no-unused-vars": "warn",
    "no-console": 1,
    "prettier/prettier": "error",
  },
};
