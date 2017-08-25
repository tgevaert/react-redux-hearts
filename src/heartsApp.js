if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_WITHOUT_DEVTOOLS) {
  module.exports = require('./components/HeartsRoot.prod.js');
} else {
  module.exports = require('./components/HeartsRoot.dev.js');
}
