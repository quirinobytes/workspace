#!/usr/bin/env node

var app = require('./config/app_config');
var db = require('./config/db_config.js');
var product = require('./models/product');
var productController = require('./controllers/productController');


app.get ('/',function (req,res) {
	res.end('Bem vindo a API RESTful - 1.0.0');
});

app.get ('/produtos' ,function (req,res) {
	productController.list(function(resp){
		res.json(resp);
	});
	console.log ("IP: " + req.connection.remoteAddress);
});


app.post ('/cadastrar', function (req,res) {
	var nome = req.body.nome;
	var tamanho = req.body.tamanho;
	var cor = req.body.cor;
	var valor = req.body.valor;

	productController.save(nome,tamanho,cor,valor,function(resp){
		res.json(resp);
	});

});


app.delete ('/apagar/:id', function(req,res){
	var id = req.params.id;

	productController.delete(id, function(resp){
		res.json(resp);
	});
	console.log('Produto excluido id: '+id);
});
