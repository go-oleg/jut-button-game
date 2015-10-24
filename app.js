var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(express.static('public'));

var server = app.listen(3013, function () {
  var host = server.address().address;
  var port = server.address().port;

  app.use(bodyParser.json())

  app.post('/sendClick', function(req, res, next) {
    // console.log(req.body.side);

    request({
        url: "https://data-engine-52-89-233-160.jutdata.io:3110/api/v1/import/webhook/?space=button_game&data_source=button_game&apikey=k81VYAN8m-1v&field_connector=webhook&field_data_source=button_game",
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
