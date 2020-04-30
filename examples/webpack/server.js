'use strict';
var express = require('express'); // eslint-disable-line node/no-missing-require
var app = express();
var dotenv = require('dotenv');
var AuthorizationV1 = require('ibm-watson/authorization/v1');
var ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');

// bundle the code
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/', // Same as `output.publicPath` in most cases.
  })
);

app.use(express.static('public/'));

// optional: load environment properties from a .env file
dotenv.load({ silent: true });

var ltAuthService = new AuthorizationV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  // iam_apikey: 'INSERT YOUR IAM API KEY HERE',
});

app.get('/api/token/tone_analyzer', function (req, res) {
  ltAuthService.getToken(function (err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token');
    }
    res.send(token);
  });
});

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port, function () {
  console.log('Watson browserify example server running at http://localhost:%s/', port);
});
