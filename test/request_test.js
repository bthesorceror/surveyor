var createSurvey = require('../index');
var createServer = require('./create_server');
var test         = require('tape');

test('initial test', function(t) {
  var server = createServer();

  t.plan(1);

  var survey = createSurvey('http://localhost:9999', 1)

  survey.on('data', function(page) {
    t.equal(page.url, 'http://localhost:9999', 'returns the correct url');
  });

  t.on('end', function() {
    server.close();
  });
});

test('survey with a depth of 2', function(t) {
  var server = createServer();

  t.plan(2);

  var counter = 0;
  var list = [
    'http://localhost:9999',
    'http://localhost:9999/test2.html'
  ];

  var survey = createSurvey('http://localhost:9999', 2)

  survey.on('data', function(page) {
    var expectedUrl = list[counter];
    t.equal(page.url, expectedUrl, 'returns the correct url');
    counter++;
  });

  t.on('end', function() {
    server.close();
  });
});

test('survey with a depth of 3', function(t) {
  var server = createServer();

  t.plan(3);

  var counter = 0;
  var list = [
    'http://localhost:9999',
    'http://localhost:9999/test2.html',
    'http://localhost:9999/test3.html'
  ];

  var survey = createSurvey('http://localhost:9999', 3)

  survey.on('data', function(page) {
    var expectedUrl = list[counter];
    t.equal(page.url, expectedUrl, 'returns the correct url');
    counter++;
  });

  t.on('end', function() {
    server.close();
  });
});

test('survey with a depth of 4', function(t) {
  var server = createServer();

  t.plan(3);

  var counter = 0;
  var list = [
    'http://localhost:9999',
    'http://localhost:9999/test2.html',
    'http://localhost:9999/test3.html'
  ];

  var survey = createSurvey('http://localhost:9999', 4)

  survey.on('data', function(page) {
    var expectedUrl = list[counter];
    t.equal(page.url, expectedUrl, 'returns the correct url');
    counter++;
  });

  t.on('end', function() {
    server.close();
  });
});
