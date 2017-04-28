const path = require('path');
const webpack = require('webpack');
var options = require('./base.js');

options.entry = './example/main.js';
options.devtool = '#source-map';
options.output = {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'build.js'
};
options.devServer = {
    historyApiFallback: true,
    noInfo: true,
    contentBase: [path.join(__dirname, '../example'),path.join(__dirname, '../node_modules/tinymce')]
};
module.exports = options;