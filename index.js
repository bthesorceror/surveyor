var async       = require('async');
var concat      = require('concat-stream');
var once        = require('once');
var request     = require('hyperquest');
var cheerio     = require('cheerio');
var resolver    = require('./resolver');
var PassThrough = require('stream').PassThrough;

module.exports = createSurvey;

function validContentType(headers) {
  return !!headers['content-type'].match('text/html');
}

function makeRequest(url, cb) {
  cb = once(cb);

  var req = request(url);

  req.on('response', function(resp) {
    var status = resp.statusCode;
    if (status !== 200) return cb();
    if (!validContentType(resp.headers)) return cb();


    var outputStream = concat(function(body) {
      cb(null, cheerio.load(body));
    });

    resp.pipe(outputStream);
    resp.on('error', cb);
  });

  req.on('error', cb);
}

function createSurvey(initialUrl, depth) {
  var stream = new PassThrough({ objectMode: true });

  var queue   = [{ url: initialUrl, depth: 0 }];
  var visited = {};

  process.nextTick(function() {
    async.whilst(
      function() {
        return queue.length > 0;
      },
      function(done) {
        var page = queue.pop();

        if (visited[page.url]) return done();

        visited[page.url] = true;

        makeRequest(page.url, function(err, $) {
          if (err) return done(err);
          if (!$) return done();

          var $anchors = $('a');

          stream.push(page);

          if (page.depth + 1 >= depth) return done();

          $anchors.each(function() {
            var $el = $(this);
            var resolved = resolver(page.url, $el.attr('href'));
            if (!resolved) return;


            queue.push({
              depth: page.depth + 1,
              url: resolved
            });
          });

          return done();
        });
      },
      function(err) {
        if (err) return stream.emit('error');
        stream.end();
      }
    );
  });

  return stream;
}
