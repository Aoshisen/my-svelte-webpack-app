import path from "path";
import { Configuration } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin"

import svelteConfig from "./svelte.config";
const mode = process.env.NODE_ENV || "development";
export const prod = mode === "production";
const config: Configuration = {
  mode: prod ? "production" : "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  devtool: prod ? false : "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            defaults: false,
          },
        },
      }),
    ],
  },
  resolve: {
    // see below for an explanation
    alias: {
      svelte: path.resolve("node_modules", "svelte/src/runtime"), // Svelte 3: path.resolve('node_modules', 'svelte')
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
    conditionNames: ["svelte", "browser", "import"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 8,
              workerParallelJobs: 50,
            },
          },
          {
            loader: "ts-loader",
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: svelteConfig,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};

const devServerConfig: DevServerConfiguration = {
  port: 3000,
  http2: true,
};

export default {
  ...config,
  devServer: devServerConfig,
};
