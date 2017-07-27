var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/host/dev-server',
        './js/test'
    ],
    output: {
        'path': path.join(__dirname, 'js'),
        'filename': 'scripts.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css']
        },{
            test: /\.less$/,
            loaders: ['style', 'css', 'less']
        }]
    },
    devServer: {
        contentBase: './dist',
        hot: true
    }
}
