import {fileURLToPath} from "url";
import {dirname} from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
    mode: "development",
    entry: {
        main: "./src/client/index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist/sort",
    },
    module: {
        rules: [{test: /\.css$/, use: ["style-loader", "css-loader"]}],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack App",
            filename: "[name].html",
            template: "src/client/index.html",
        }),
    ],
};

export default config;
