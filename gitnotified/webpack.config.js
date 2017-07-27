var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: [
        './js/test'
    ],
    output: {
        'path': path.join(__dirname, 'build'),
        'filename': 'scripts.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyWebpackPlugin([
            {from: './img', to: 'img'},
            {from: './css', to: 'css'},
            {from: './fonts', to: 'fonts'}
        ], {
            ignore: [],
            copyUnmodified: false
        })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        },{
            test: /\.less$/,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        }]
    }
}
