const merge = require('webpack-merge');
const path = require('path');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const common = require('./webpack.common.js');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: '.cache/', // 缓存压缩，默认不缓存，设置存放位置开启
        test: /\.js[x]?$/, // 匹配需要压缩的文件，默认为/.js$/和Loader配置一样
        // include: [], 使用正则去选择需要被压缩的文件和Loader配置一样
        // exclude: [], 使用正则去去除不需要被压缩的文件和Loader配置一样
        // workerCount: 2, 开启几个子进程并发执行压缩
        // sourceMap: false, 是否输出source Map，开启会导致压缩变慢
        // uglifyJS: {}, 用于压缩ES6代码不可和uglifyJS同时使用
        uglifyJS: {
          output: {
            beautify: false,
            comments: false,
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true,
          },
        },
      }),
    ],
  },
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
    'prop-types': {
      root: 'propTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
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
  plugins: [
    new ModuleConcatPlugin(),
  ],
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
