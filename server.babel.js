import Path from 'path';
import Express from 'express';

import WebpackDevHelper from './webpackDevHelper.babel';

const app = Express();
const port = (process.env.PORT || 8080);

if (process.env.NODE_ENV !== 'production') {
  console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
  WebpackDevHelper(process, app);
} else {
  app.use('*', Express.static(Path.join(__dirname, '/public')) );
}

app.get('*', (_, res) => res.sendFile(Path.join(__dirname, '/public/assets/index.html')) );

app.listen(port);

console.log(`====== Listening at http://localhost:${port} =================>`);
