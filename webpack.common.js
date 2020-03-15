const path = require('path');

const resolve = dir => path.resolve(__dirname, dir);
const context = resolve('src');
const autoprefixer = require('autoprefixer')({
  browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
});
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
            query: {
              // presets: ['es2015', 'stage-0', 'react'],
              // plugins: ['transform-runtime']
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
        include: context,
        exclude: resolve('node_modules'),
      },
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer],
              },
            },
          ],
        }),
      },
      {
        test: /\.s[c|a]ss$/,
        exclude: resolve('node_modules'),
        use: [
          {
            loader: 'style-loader/useable',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less'],
  },
};
