const path = require('path');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
  },
};
