const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = merge(common, {
  mode: 'production',
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-router-dom': {
      root: 'ReactRouterDOM',
      commonjs2: 'react-router-dom',
      commonjs: 'react-router-dom',
      amd: 'react-router-dom',
    },
    antd: {
      root: 'antd',
      commonjs2: 'antd',
      commonjs: 'antd',
      amd: 'antd',
    },
    moment: {
      root: 'moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment',
    },
  },
  entry: {
    index: resolve('src/components'),
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    library: 'wzn-base-components',
    libraryTarget: 'umd',
  },
});
