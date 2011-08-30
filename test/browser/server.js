// core libs
var http = require('http'),
    fs = require('fs'),
    url = require('url');
// app libs
// Router
var Router = require('./lib/router.js');
var route = new Router();

// redirect / to /websocket explicitly
route.set('/', function(req, res, params, next) {
  res.statusCode = 302;
  res.setHeader('Location', '/test/test.html');
  res.end('Redirect to /test/test.html');
});
route.file('/test.html', './test.html');

route.directory(/lib\/(.*)/, './lib/');
route.directory(/spec\/(.*)/, './spec/');
route.directory(/vendor\/(.*)/, './vendor/');

// HTTP
var server = http.createServer(function(req, res) {
  req.url = req.url.replace('/test/', '/');
  route.route(req, res);
});
server.listen(8888, '0.0.0.0');
console.log('HTTP server listening at 8888');
