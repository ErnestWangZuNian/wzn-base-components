const merge = require('webpack-merge');
const path = require('path');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const fs = require('fs');
const common = require('./webpack.common.js');

const resolve = dir => path.resolve(__dirname, dir);

//  获取入口
const getEntry = (componentsPath) => {
  const componentsDir = fs.readdirSync(resolve(componentsPath));
  const files = {};
  // 递归遍历
  const getFiles = (dirs, currentPath, currentDir) => {
    dirs.forEach((item) => {
      const statPath = resolve(`${currentPath}/${item}`);
      const fsStat = fs.statSync(statPath);
      if (fsStat.isDirectory(item)) {
        const newDirs = fs.readdirSync(statPath);
        getFiles(newDirs, statPath, currentDir ? `${currentDir}\\${item}` : item);
      } else if (item.match(/\.js[x]?$/g)) {
        const newItem = item.replace(/\.js[x]?$/, '');
        if (currentDir) {
          files[`${currentDir}\\${newItem}`] = resolve(`${currentPath}/${item}`);
        } else {
          files[newItem] = resolve(`${currentPath}/${item}`);
        }
      }
    });
  };
  getFiles(componentsDir, componentsPath);
  return files;
};


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
    // splitChunks: {// 可以在这里直接设置抽离代码的参数，最后将符合条件的代码打包至一个公共文件
    //   cacheGroups: {// 设置缓存组用来抽取满足不同规则的chunk,下面以生成common、vender为例
    //     // 根据不同的参数设置抽取不同条件的公共js
    //     common: {//
    //       name: 'common',
    //       // test: /[^index.js]/,
    //       chunks: 'all',
    //       minSize: 1,
    //       minChunks: 2,
    //       priority: 1, // 设置匹配优先级，数字越小，优先级越低
    //     },
    //   },
    // },

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
  entry: { vendor: ['wzn-utils'], ...getEntry('src/components') },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    library: 'wzn-base-components',
    libraryTarget: 'umd',
  },
});
