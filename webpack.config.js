const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

//Config
const developmentPlugins = require("./developmentPlugins");
const productionPlugins = require("./productionPlugins");
const FRAGMENT_NAME = "fragment-name";

const smp = new SpeedMeasurePlugin();
const debugWebpackMode = process.argv.includes("--debug");

process.traceDeprecation = true;

module.exports = function(opt) {
    const BUILD = !!opt.BUILD;
    const cssPlugin = new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    });

    const plugins = [
        new HtmlWebpackPlugin({
            filename: "index.html",
            pkg: require("./package.json"),
            template: "./src/index.html",
            hash: true,
            inject: "body",
            [BUILD ? "minify" : ""]: {
                caseSensitive: true,
                collapseWhitespace: true,
                minifyCSS: true
            },
            chunks: [FRAGMENT_NAME, "vendor"]
        }),
        new webpack.IgnorePlugin(/\.\/locale$/),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: "./tsconfig.json",
            watch: "./src/**/*.ts",
            async: false
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    "Your application is running here: http://localhost:" +
                        process.env.PORT
                ]
            }
        }),
        cssPlugin
    ];

    const config = {
        cache: true,
        mode: BUILD ? "production" : "development",
        context: __dirname,
        entry: {
            [FRAGMENT_NAME]: ["index"],
            vendor: ["angular-messages", "angular-resource"]
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            publicPath: "/",
            filename: "[name].js",
            chunkFilename: "[name].[hash].js"
        },
        optimization: {
            namedChunks: true,
            splitChunks: {
                automaticNameDelimiter: "-",
                cacheGroups: {
                    vendor: {
                        chunks: "async",
                        priority: -10
                    }
                }
            },
            minimize: BUILD ? true : false,
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        compress: {
                            warnings: false
                        },
                        mangle: false
                    }
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: { reduceIdents: false }
                })
            ]
        },
        module: {
            noParse: /\.min\.js/,
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    exclude: /(node_modules|bower_components)/,
                    include: /src/,
                    loader: "eslint-loader"
                },
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|ttf|otf|eot)(\?]?.*)?$/,
                    // exclude: /node_modules/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 1024,
                                name: "fonts/[name].[ext]?[hash]"
                            }
                        }
                    ]
                },
                {
                    test: /.*(?<!-icon)\.svg$/,
                    // exclude: /node_modules/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 1024,
                                name: "fonts/[name].[ext]?[hash]"
                            }
                        }
                    ]
                },
                {
                    test: /.*-icon\.svg$/i,
                    use: [
                        {
                            loader: "raw-loader"
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.(jpe?g|gif|cur)$/i,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                                name: "img/[name].[ext]?[hash]"
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /.*(?<!-base64)\.png$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                                mimetype: "image/png",
                                name: "img/[name].[ext]?[hash]"
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /.*-base64\.png$/i,
                    use: "base64-inline-loader?limit=1000&name=[name].[ext]"
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                },
                {
                    test: /^((?!\.module).)*scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.module.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName:
                                    "[name]__[local]__[hash:base64:5]"
                            }
                        },
                        "sass-loader"
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {
                                exportAsEs6Default: true,
                                root: path.resolve(__dirname, "src")
                            }
                        }
                    ],
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [".webpack.js", ".web.js", ".js", ".ts", ".tsx"],
            modules: [
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "src/app"),
                "node_modules"
            ],
            symlinks: false
        },
        plugins: BUILD
            ? plugins.concat(productionPlugins) // PRODUCTION ==> default + production plugins
            : plugins.concat(developmentPlugins), // DEVELOPMENT ==> default + development plugins
        // DEVELOPMENT ==> devServer
        devtool: !BUILD ? "cheap-module-eval-source-map" : "",
        devServer: !BUILD
            ? {
                  disableHostCheck: true,
                  contentBase: path.join(__dirname, "dist"),
                  compress: true,
                  overlay: true,
                  inline: true,
                  quiet: true, // necessary for FriendlyErrorsPlugin
                  historyApiFallback: true,
              }
            : {}
    };

    if (BUILD) return config;
    return debugWebpackMode ? smp.wrap(config) : config;
};
