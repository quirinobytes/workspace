#!/usr/bin/env node

var app = require('./config/app_config');
var db = require('./config/db_config.js');
var product = require('./models/product');
var productController = require('./controllers/productController');
var os = require("os");
var fs= require('fs');
var nodesFile= 'nodes.txt';
fs.writeFile(nodesFile);
var txt;

var aliveNodes = [];
var active_nodes = [];
var death_nodes = [];

app.get ('/',function (req,res) {
	res.write('<html>');
	res.write('Bem vindo a API RESTful (Unbound) - v1.0');
	res.write('<br> Servidor: '+os.hostname()+'<hr>');

	fs.readFile(nodesFile,function(err,txt){
	if (typeof txt !== 'undefined' ){
	console.log(""+txt);
	res.write("<br>");
	res.write("Lista de Servidores Anunciados:<br>");
	res.write(txt);	
	
	for (var i = 0, len = aliveNodes.length; i < len; i++) {
		res.write("<BR>");
		res.write(aliveNodes[i]);
		}
	}
	res.end('</html>');
	});

});

app.get ('/listar' ,function (req,res) {
//	productController.save(req.connection.remoteAddress);
	productController.list(function(resp){
		res.json(resp);
	});
	console.log ("IP: " + req.connection.remoteAddress);
});

app.post ('/hello', function (req,res) {
	var nome = req.body.nome;
	var tamanho = req.body.tamanho;
	var cor = req.body.cor;
	var valor = req.body.valor;


	console.log ("HELLO: " + req.connection.remoteAddress);

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		if (ip.substr(0, 7) == "::ffff:") {
		  ip = ip.substr(7)
		}

	aliveNodes.push(ip);
	res.json({cadastro:true});
});



app.post ('/cadastrar', function (req,res) {
	var nome = req.body.nome;
	var tamanho = req.body.tamanho;
	var cor = req.body.cor;
	var valor = req.body.valor;

	productController.save(nome,tamanho,cor,valor,function(resp){
		res.json(resp);
	});

	fs.writeFile(nodesFile,req.connection.remoteAddress);

});


app.delete ('/apagar/:id', function(req,res){
	var id = req.params.id;

	productController.delete(id, function(resp){
		res.json(resp);
	});
	console.log('Produto excluido id: '+id);
});
