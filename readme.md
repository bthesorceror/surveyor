# Surveyor

Simple stream based web crawler

## Example

```javascript
var through      = require('through2');
var createSurvey = require('./index');

var survey = createSurvey('https://www.reddit.com/', 2);

var transform = through({ objectMode: true }, function(data, enc, done) {
  this.push(data.url + '\n');
  done();
});

survey.pipe(transform).pipe(process.stdout);
```
