var express = require('express');
var path = require('path');

var port = 8080;
var app = express();

app.use('/', express.static('examples'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('App is live at http://localhost:' + port);
});
