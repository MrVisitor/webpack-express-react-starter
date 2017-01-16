import Webpack from 'webpack';
import Path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

/* eslint-disable no-console */
console.log(`====== Now building ${process.env.NODE_ENV.toUpperCase()} version ======================>`);
/* eslint-enable no-console */

const plugins = [
  new HtmlWebpackPlugin({
    template: Path.join(__dirname, 'src/views/index.ejs'),
    title: 'BTK'
  })
];

process.env.NODE_ENV === 'production' && plugins.push(
  new Webpack.DefinePlugin(process.env.NODE_ENV),
  new Webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compressor: {
      warnings: false,
      drop_console: true,
      drop_debugger: true
    }
  }),
  new Webpack.optimize.OccurrenceOrderPlugin(),
  new Webpack.optimize.DedupePlugin()
);

process.env.NODE_ENV === 'dev' && plugins.push(
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.NoErrorsPlugin()
);

const DevEntry = [
  Path.join(__dirname, 'src/index.js'),
  'webpack-hot-middleware/client'
];

const ProdEntry = [
  Path.join(__dirname, 'src/index.js')
];

export default {
  entry: process.env.NODE_ENV === 'production' ? ProdEntry : DevEntry,
  devPort: 8080,
  output: {
    path: Path.join(__dirname, 'public', 'assets'),
    filename: process.env.NODE_ENV === 'production' ? '[chunkhash].bundle.js' : 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel-loader?' + JSON.stringify({
            presets: ['react', 'es2015', 'stage-0'],
            env: {
              production: {
                presets: ['react-optimize']
              }
            }
          })
        ],
        include: Path.join(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.svg$/,
        loader: 'babel?presets[]=es2015,presets[]=react!svg-react'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'file'
      }
    ]
  },
  plugins: plugins,
  devtool: 'source-map'
};
