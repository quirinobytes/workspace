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

CarrosBD.collection.insertMany(data, function (err, r) {

	assert.equal (null,err);
//	assert.equal(4,r.insertedCount);
//	db.close;
})



//console.log(JSON.stringify(data));

//var jsonData = [{"Carro":"me","age":"30"},{"person":"you","age":"25"}];
//var json = JSON.parse(data);


//for(var key in json) {
//  console.log("Carro:"+key)
//+", Ano:"+ json[key]);
//}


/*
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

*/
