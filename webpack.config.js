const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
           loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader',
            {
              loader: 'postcss-loader',
              options: {
                  plugins: () => [require('autoprefixer')({
                      'browsers': ['> 1%', 'last 2 versions']
                  })],
              }
            },'sass-loader']
          })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
         {
            fallback: 'style-loader',
            use: ['css-loader']
          })
      },
      { test: /\.(png|jpg)$/, use: 'url-loader?limit=8192' },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
             {
               loader: 'file-loader?name=./assets/fonts/webfonts/[name].[ext]'
             }
         ]
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json']
  },
  plugins: [
    new CleanWebpackPlugin('build', {} ),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new ExtractTextPlugin({filename: 'style.css'})
  ]
};
