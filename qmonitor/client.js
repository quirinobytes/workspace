#!/usr/bin/env node

var app = require('./config/app_config');
var db = require('./config/db_config.js');
var product = require('./models/product');
var productController = require('./controllers/productController');
var os = require("os");
var request = require('request');
var fs= require('fs');
var nodesFile= 'nodes.txt';
var body="";
fs.writeFile(nodesFile,'');
var txt;

var aliveNodes = [];
var active_nodes = [];
var death_nodes = [];


//####################################### LISTAR NODES ###############
app.get ('/x/listar' ,function (req,res) {
		res.json({servidores:aliveNodes});
});

app.get ('/x/uptime' ,function (req,res) {
		res.write(""+aliveNodes.length);
		res.end();
		console.log(aliveNodes.length);

});



function hello () {

 var options = { method: 'POST',
     url: 'http://189.55.194.115:3000/hello',
     headers:
      { 'postman-token': '0c17b7e5-ee61-6514-60af-a7384edb97dc',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded' },
     form:
      { ativo: papel,
        quantidade: qtde,
        valor: preco,
        token: '1234abcd'
      }
    };

    req = request(options, function (error, response, body) {
        if(error) throw new Error(error)

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		if (ip.substr(0, 7) == "::ffff:") {
		  ip = ip.substr(7)
		}
	console.log ("HELLO: " + ip);

	});
}

