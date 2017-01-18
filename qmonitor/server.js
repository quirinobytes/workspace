#!/usr/bin/env node

var app = require('./config/app_config');
var db = require('./config/db_config.js');
var product = require('./models/product');
var productController = require('./controllers/productController');
var os = require("os");

app.get ('/',function (req,res) {
	res.write('<html>');
	res.write('Bem vindo a Carros OLX - v1.0.0');
	res.write('<br> Servidor: '+os.hostname());
	res.end('</html>');
});

app.get ('/listar' ,function (req,res) {
\\	productController.save(req.connection.remoteAddress);
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
