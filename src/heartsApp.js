if (process.env.NODE_ENV === 'production') {
  module.exports = require('./components/HeartsRoot.prod.js');
} else {
  module.exports = require('./components/HeartsRoot.dev.js');
}
