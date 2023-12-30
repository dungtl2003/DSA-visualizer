import {fileURLToPath} from "url";
import {dirname} from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
    mode: "development",
    devServer: {
        port: 9000,
        static: {
            directory: __dirname + "/dist",
        },
        devMiddleware: {
            index: "index.html",
            writeToDisk: true,
        },
    },
    entry: {
        app: "./client/index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
        clean: true,
    },
    module: {
        rules: [
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "client/index.html",
            favicon: "./client/asset/img/favicon.png",
        }),
    ],
};

export default config;
