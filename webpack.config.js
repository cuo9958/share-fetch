const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const cleanOptions = {
    root: path.resolve(__dirname),
    verbose: true,
    dry: false,
    cleanOnceBeforeBuildPatterns: ["dist"],
};

module.exports = {
    resolve: {
        extensions: [".js", ".ts", ".json"],
    },
    devtool: "source-map",
    mode: "production",
    entry: {
        index: "./index.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "lib"),
        libraryTarget: "amd",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, "./tsconfig.json"),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [new webpack.ProgressPlugin(), new CleanWebpackPlugin(cleanOptions)],
};
