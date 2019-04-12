const path = require("path")
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {
        "entry": "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist" ),
        filename: "main.js",
        chunkFilename: "[name].build.js",
        publicPath: "/",
    },
    optimization: {
        splitChunks: {
            name: "async",
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.scss$/,
                    chunks: "all"
                }
            }
        }
    },
    stats: {
        hash: false,
        version: false,
        timings: false,
        children: false,
        errors: true,
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({ allChunks: true, filename: "[name].bundle.css" }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "node_modules/@huth")
                ],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: true,
                            plugins: [ ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                sideEffects: true,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
    },
    resolve: {
        symlinks: false,
        modules: [
            path.resolve("./"),
            path.resolve("./node_modules")
        ]
    }
}
