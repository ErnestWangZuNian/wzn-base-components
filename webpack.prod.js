const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = merge(common, {
    mode: 'production',
    entry: {
        main: resolve('src/components'),
    },
    output: {
        filename: 'index.js',
        path: resolve('dist'),
        library: 'wzn-base-components',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this',
    },
})