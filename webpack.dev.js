const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = merge(
  common,
  {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      main: resolve('src/main.js'),
    },
    output: {
      filename: '[name].bundle.js',
      path: resolve('dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        title: 'Production',
        template: path.resolve(__dirname, 'index.html'),
      }),
      new ExtractTextWebpackPlugin({ filename: 'css/style.[chunkhash].css', allChunks: true }),
    ],
    //  提取公共代码
    optimization: {
      namedModules: true,
      namedChunks: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
          // 抽离第三方插件
            test: /node_modules/, // 指定是node_modules下的第三方包
            chunks: 'initial',
            name: 'vendor', // 打包后的文件名，任意命名
            // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
            priority: 10,
          },
          common: {
          // 抽离自己写的公共代码，utils这个名字可以随意起
            chunks: 'initial',
            name: 'common', //  任意命名
            minSize: 0, // 只要超出0字节就生成一个新包
          },
        },
      },
    },
    devServer: {
      contentBase: './dist', // 开发服务运行时的文件根目录
      historyApiFallback: true, // spa不跳转,history模式的路由需要true
      host: 'localhost',
      port: 8081,
      // hot: true,
      inline: true, // 实时刷新
      compress: true, // Enable gzip compression for everything served
      overlay: true, // Shows a full-screen overlay in the browser
      open: true,
      proxy: {
        '/': {
          target: 'https://api.douban.com',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/': '',
          },
        },
      },
    },
  },

);
