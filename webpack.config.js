/**
 * Webpack configuration
 * Author: Branislav Maksin, bane@maksin.net
 * Date: 1.9.2017
 * Copyright: MIT (c) 2017 Branislav Maksin
 * Version: 1.0.0
 */

// Dependencies
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const svg2png = require('svg2png');

// Constant
const API_V = 'v1';
const API_KEY = 'd66c7801aa27db362f3d0f2545e63a2f';

// Plugins
const plugins = [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        API_V: JSON.stringify(API_V)
    }),
    new CopyWebpackPlugin([
        {
            from: './src/images/icons/swap.svg',
            transform: (content, path) => svg2png.sync(Buffer.from(content)),
            to: 'images/icons/favicon.png'
        }
    ]),
    new MiniCssExtractPlugin({
        filename: `[name].[hash].css`,
        chunkFilename: '[id].[hash].chunk.css'
    })
];

// Get all pug templates
glob.sync(`./src/templates/*.?(pug|jade)`).forEach(item => {
    plugins.push(
        new HtmlWebpackPlugin({
            filename: `${path.basename(item, path.extname(item))}.html`,
            template: item
        })
    );
});

// Extend HTML plugin
plugins.push(new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'async'
}));

/**
 * Webpack configuration
 *
 * @param env
 * @param argv
 * @returns {{output: {filename: string, path: string}, module: {rules: *[]}, resolve: {extensions: string[]}, devServer: {contentBase: string}, plugins: *[]}}
 */
const config = (env, argv) => {
    const DEV = argv.mode === 'development';
    return {
        entry: DEV ? {
            'global': './src/style/main.scss',
            'polyfills': './src/app/polyfills.ts',
            'main': './src/app/app.main.ts'
        } : {
            app: [
                './src/style/main.scss',
                './src/app/polyfills.ts',
                './src/app/app.main.ts'
            ]
        },
        output: {
            filename: '[name].[hash].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        devtool: DEV ? 'source-map' : '',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        'angular2-template-loader',
                        'ts-loader'
                    ],
                    exclude: [
                        '/node_modules/',
                        new RegExp('reflect-metadata\\' + path.sep + 'Reflect\\.ts')
                    ]
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: DEV
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: DEV
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: [/main\.scss$/],
                    use: [
                        'to-string-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: DEV
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: DEV
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: DEV
                            }
                        }
                    ]
                },
                {
                    test: /main\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: DEV
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: DEV
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: DEV
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader?name=/images/[name].[ext]'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /.pug$/,
                    use: {
                        loader: 'pug-loader',
                        query: {}
                    }
                },
                {
                    test: /\.font\.js/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'webfonts-loader'
                    ]
                },
            ]
        },
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        devServer: {
            contentBase: './dist',
            hot: true,
            proxy: { //  Send API requests on localhost to API server get around CORS
                [`/${API_V}/exchange-rates/`]: {
                    target: `https://api.kursna-lista.info/${API_KEY}/kursna_lista`,
                    secure: true,
                    changeOrigin: true,
                    bypass: function(req, res, proxyOptions) {
                        if(req.method !== 'GET') {
                            return false;
                        }
                    }
                }
            }
        },
        plugins
    };
};

// Export configuration
module.exports = config;
