var express = require('express');
var app = express();

app.use(express.bodyParser());
app.get('/test', function(req, res) {
  res.send('hello');
});

app.listen();