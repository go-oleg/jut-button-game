var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(express.static('public'));

app.set('port', (process.env.PORT || 5000));

var RESPONSE_TIME = 50;

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  app.use(bodyParser.json());

  app.get('/response-time', function(req, res, next) {
    setTimeout(function() {
      res.send("Done!");
    }, RESPONSE_TIME);
  });

  app.post('/sendClick', function(req, res, next) {
    request({
        url: process.env.JUT_WEBOOK_URL,
        method: "POST",
        json: true,
        contentType: "application/json",
        body: {
          side: req.body.side
        }
    }, function(err, response, body) {
        if (response.statusCode !== 200) {
            console.log('statusCode: ' + response.statusCode);
        }
    });

    res.send();
  });

  console.log('Example app listening at http://%s:%s', host, port);
});
