var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(express.static('public'));

app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  app.use(bodyParser.json());

  app.post('/sendClick', function(req, res, next) {
    request({
        url: process.env.JUT_WEBHOOK_URL,
        method: "POST",
        json: true,
        contentType: "application/json",
        body: {
          side: req.body.side
        }
    }, function(err, response, body) {
        if (err) {
          console.log('error: ' + err);
        }
        else if (response.statusCode !== 200) {
          console.log('response code: ' + response.statusCode);
        }
    });

    res.send();
  });

  console.log('Example app listening at http://%s:%s', host, port);
});
