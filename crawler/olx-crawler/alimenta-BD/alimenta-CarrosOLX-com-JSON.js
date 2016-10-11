#!/usr/bin/env node
var http = require('http');
var data = require('./carros.json');

//console.log('Lendo arquivo carros.json');
//var json = JSON.parse(data);
//console.log('Arquivo carros.json OK');


var mongoose = require('mongoose');

var strDBConnect = 'mongodb://dev1/CarrosOLX';



mongoose.connect(strDBConnect, function (err,res ){
 if (err)
         console.log('Não foi possivel conectar a: '+ strDBConnect);
  else
        console.log('Conectado a: '+ strDBConnect);
});


var Schema = mongoose.Schema;

var carrosSchema = new Schema({
	Carro: String,
	Ano: Number,
	Valor: Number,
});

var CarrosBD = mongoose.model('CarrosOLX',carrosSchema);

CarrosBD.collection.insert(data,function(err, records){
	if (err) console.log(err);
	else
	{
           console.log("Inserted : "+records.insertedCount);
	   //console.info("Total de Itens inseridos com sucesso: "+result);
	   mongoose.disconnect();
	}
});

