var test     = require('tape');
var resolver = require('../resolver');

test('with full url', function(t) {
  t.plan(1);

  var origin = 'http://www.google.com';
  var path   = 'http://www.yahoo.com'
  var result = resolver(origin, path);

  t.equal(result, path, 'returns the url');
});

test('with full url without protocol', function(t) {
  t.plan(1);

  var origin = 'https://www.google.com';
  var path   = '//www.yahoo.com'
  var result = resolver(origin, path);

  t.equal(result, 'https://www.yahoo.com', 'returns the url');
});

test('with full relative path', function(t) {
  t.plan(1);

  var origin = 'http://www.google.com';
  var path   = '/test'
  var result = resolver(origin, path);

  t.equal(result, 'http://www.google.com/test', 'returns the url');
});

test('with relative path', function(t) {
  t.plan(1);

  var origin = 'http://www.google.com';
  var path   = 'test'
  var result = resolver(origin, path);

  t.equal(result, 'http://www.google.com/test', 'returns the url');
});

test('with missing path', function(t) {
  t.plan(1);

  var origin = 'http://www.google.com';
  var path   = undefined;
  var result = resolver(origin, path);

  t.equal(result, false, 'returns the url');
});
