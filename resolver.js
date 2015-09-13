var url = require('url');

module.exports = resolver;

function resolver(origin, path) {
  if (!path) return false;
  if (path.match(/^http[s]*/)) {
    return path;
  } else if (path.match(/^\/\//)) {
    var parsed = url.parse(origin);
    return parsed.protocol + path
  } else if (path[0] !== '/') {
    return origin + '/' + path
  } else {
    var parsed = url.parse(origin);
    return parsed.protocol + '//' + parsed.host + path;
  }
}
