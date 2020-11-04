const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const InterpolateWebpackPlugin = require("interpolate-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "dist.js",
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    alias: {
      react: path.join(__dirname, "node_modules", "react"),
      node_modules: path.join(__dirname, "node_modules"),
      components: path.resolve(__dirname, "src", "components"),
      "ui-components": path.resolve(__dirname, "src", "ui-components"),
    },
    extensions: [".js", ".css", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
          {
            loader: "sass-resources-loader",
            options: {
              resources: [
                // The second parameter of the resolve method is the address of the scss configuration file. If there are more than one, just add them one by one.
                path.resolve(__dirname, "./src/assets/styles/index.scss"),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      interpolate: true,
      PUBLIC_URL: "public",
    }),
    new InterpolateWebpackPlugin([
      {
        key: "PUBLIC_URL",
        value: "public",
        type: "STRING",
      },
    ]),
    // new InterpolateHtmlPlugin({ PUBLIC_URL: "public" }),
  ],
};
