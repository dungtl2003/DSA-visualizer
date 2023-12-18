import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
    mode: "development",
    entry: {
        app: "./src/client/index.js",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist",
    },
    module: {
        rules: [{ test: /\.css$/, use: "css-loader" }],
    },
};

export default config;
