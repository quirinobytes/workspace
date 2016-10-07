#!/usr/bin/env node

var app = require('./config/app_config');
var db = require('./config/db_config.js');




app.get ("/",function (req,res) {

	var produto = {
	nome : 'Sapato',
	tamanho: 35,
	cor : 'Preto',
	valor: '50,00',
	}

	res.json(produto);
	
	console.log ("IP: " + req.connection.remoteAddress);
});



app.get ("/cadastrar/",function (req,res) {

	nome = req.params('nome').text();
	tamanho = req.params('').text;
	cor = req.params();
	valor = req.params('valor').text();

});



app.get ('/apagar/:id',function (req,res){
	var id = req.params('id').text();
});
