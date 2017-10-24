var path = require('path');
var webpack = require('webpack');

let entries = {
    "index.1.0": './index.js'
}

let outputDir = '/';

module.exports = {
    cache: true,
    entry: './index.js',
    output: {
        path: __dirname + outputDir,
        filename: '[name].js?[hash:6]'
    },
    module: {
        rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.tpl$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ivy-template-loader',
                    options: {
                        minimize: true,
                        /* 可自定义 */
                        settings: {
                            evaluate: /{{([\s\S]+?)}}/g,
                            interpolate: /<%=([\s\S]+?)%>/g,
                            escape: /<%-([\s\S]+?)%>/g
                        }
                    }
                }
            }
        ]
    },
    watch: false,
    plugins: [],
    resolve: {
        extensions: ['.js', '.jsx', '.tpl', '.json']
    },
    externals: {}
}