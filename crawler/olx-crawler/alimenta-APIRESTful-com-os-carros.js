var http = require('http');
var data = require('./carros.json');



var options = {
    host: '192.168.1.166',
    port: 3000,
    path: '/cadastrar',
    method: 'POST'
};

var req = http.request(options, function(res){
    console.log('status: ' + res.statusCode);
    console.log('headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        console.log("body: " + chunk);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();
// This chunk is
