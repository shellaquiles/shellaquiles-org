const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/js/main.js',
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: isProduction ? 'script.min.js' : 'script.js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      ...(isProduction ? [new MiniCssExtractPlugin({
        filename: '../css/[name].css'
      })] : [])
    ],
    resolve: {
      extensions: ['.js', '.css']
    },
    devtool: isProduction ? false : 'eval-source-map',
    watch: !isProduction
  };
};
