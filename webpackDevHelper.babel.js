import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

export default (process, app) => {
  const WebpackConfig = require('./webpack.config.babel').default;
  const compiler = Webpack( WebpackConfig );

  app.use(WebpackDevMiddleware(compiler, {
    publicPath: WebpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
      'errors-only': true
    }
  }));

  return app.use( WebpackHotMiddleware( compiler, {
    log: console.log
  }));
}
