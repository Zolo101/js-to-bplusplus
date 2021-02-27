/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const webpack = require("webpack");
const path = require("path");

const config = {
    entry: [
        "./src/index.ts",
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [
            ".tsx",
            ".ts",
            ".js",
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        port: 5500,
    },
};

module.exports = config;
