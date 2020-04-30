const path = require('path');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/view/index.html'
        })
    ],
    module: {
        rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            }
        ]
    }
});
