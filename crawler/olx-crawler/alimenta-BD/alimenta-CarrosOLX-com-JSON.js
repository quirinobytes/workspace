#!/usr/bin/env node
var http = require('http');
var data = require('./carros.json');


var mongoose = require('mongoose');
var assert = require('assert');

var strDBConnect = 'mongodb://localhost/CarrosOLX';

mongoose.connect(strDBConnect, function (err,res ){
 if (err)
         console.log('Não foi possivel conectar a: '+ strDBConnect);
  else
        console.log('Conectado a: '+ strDBConnect);
});


var Schema = mongoose.Schema;

var carrosSchema = new Schema({
	carro: String,
	ano: String,
	valor: String,
});

var CarrosBD = mongoose.model('CarrosOLX',carrosSchema);

Carros.collection.insert(data,function (err,result){
	
	if (err)
	{
		console.info (err);
	}
	else
	{
	   console.info("Total de Itens inseridos com sucesso: "+result.count());
	}
});

