const path = require('path');
const webpack = require('webpack');
var options = require('./base.js');

options.entry = './example/main.js';
options.devtool = '#source-map';
options.output = {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/vendor/',
    filename: 'build.js'
};
options.devServer = {
    historyApiFallback: true,
    noInfo: true,
    contentBase: [path.join(__dirname, '../example')]
};
module.exports = options;