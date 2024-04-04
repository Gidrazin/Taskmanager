const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const Dotenv = require('dotenv-webpack')

let mode = 'development'
let target = 'web'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
    target = 'browserslist'
}

const plugins = [
    new MiniCssExtractPlugin({
        filename: `[name].css`
    }),
    new Dotenv({
        path: '../.env'
    })
]

if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin())
}

module.exports = {
    mode,
    target,
    plugins,
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        assetModuleFilename: 'assets/[name][ext][query]',
        clean: true
    },
    
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }

        ]
    }
}
