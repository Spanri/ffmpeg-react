// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

/**
 * Webpack, but overrided))
 * @param {Object} config
 */
module.exports = function override(config) {
  if (!config.module.rules) config.module.rules = [];
  if (!config.resolve.alias) config.resolve.alias = {};

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: "sass-resources-loader",
        options: {
          resources: [path.resolve(__dirname, "./src/assets/styles/index.scss")],
        },
      },
    ],
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    react: path.join(__dirname, "node_modules", "react"),
    node_modules: path.join(__dirname, "node_modules"),
    assets: path.resolve(__dirname, "src", "assets"),
    components: path.resolve(__dirname, "src", "components"),
    "ui-components": path.resolve(__dirname, "src", "ui-components"),
  };

  return config;
};
