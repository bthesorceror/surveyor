var http = require('http');
var path = require('path');
var fs   = require('fs');

module.exports = createServer;

function createServer() {
  var server = http.createServer(function(req, res) {
    if (req.url === '/') {
      var fullPath = path.join(__dirname, 'fixtures', 'test.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream(fullPath).pipe(res);
    } else {
      var fullPath = path.join(__dirname, 'fixtures', req.url.slice(1));
      if (req.url.match('png')) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        fs.createReadStream(fullPath).pipe(res);
      } else if (fs.existsSync(fullPath)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(fullPath).pipe(res);
      } else {
        res.writeHead(404); res.end();
      }
    }
  });

  server.listen(9999);

  return server;
}
