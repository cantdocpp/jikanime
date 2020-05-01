const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
    ],
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]',
                outputPath: 'imgs'
            }
        }
      },
      {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'src/assets/'),
      Api: path.resolve(__dirname, 'src/api/')
    }
  }
};
