const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const sharp = require("sharp");

const mode = process.env.NODE_ENV;
const isProd = mode === "production";

module.exports = {
  entry: "./src/index.css",
  mode,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "javascript/auto"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? "[name].[contenthash].css" : "[name].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      gaId: process.env.GA_ID
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/images",
          to: "images",
          transform: content => sharp(content).resize(160).toBuffer()
        }
      ]
    }),
    new ImageMinimizerPlugin({
      severityError: "warning",
      minimizerOptions: {
        plugins: ["mozjpeg"]
      },
      loader: false
    })
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
};
