#!/usr/bin/env node

var app = require('./config/app_config');
var db = require('./config/db_config.js');
var carros = require('./models/carros');
var CarController = require('./controllers/CarController');
//var data = require('./carros.json');



app.get ('/',function (req,res) {
	res.end('Bem vindo a API RESTful - 1.0.0<h1> Aeee Marcos, essa foi fera!!! ');
});

app.get ('/carros' ,function (req,res) {
	CarController.list(function(resp){
		res.json(resp);
	});
	console.log ("IP: " + req.connection.remoteAddress);
});


app.post ('/cadastrar', function (req,res) {
	var carro = req.body.carro;
	var ano = req.body.ano;
	var valor = req.body.valor;

	CarController.save(carro,ano,valor,function(resp){
		res.json(resp);
	});

});


app.delete ('/apagar/:id', function(req,res){
	var id = req.params.id;

	CarController.delete(id, function(resp){
		res.json(resp);
	});
	console.log('Produto excluido id: '+id);
});
