import {fileURLToPath} from "url";
import {dirname} from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
    mode: "production",
    entry: {
        app: "./client/index.js",
    },
    output: {
        filename: "assets/js/[name].[contenthash].bundle.js",
        path: __dirname + "/dist",
        clean: true,
    },
    module: {
        rules: [
            {test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"]},
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[hash][ext][query]",
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[hash][ext][query]",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "client/index.html",
            favicon: "./client/asset/img/favicon.png",
        }),
        new MiniCssExtractPlugin({
            filename: "assets/styles/[contenthash].css",
        }),
    ],
};

export default config;
