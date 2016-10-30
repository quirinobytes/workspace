#!/usr/bin/env node
var request = require('request');
var Chance = require('chance');
var chance = new Chance();

var totalUrl = 1;
array_valores=[];

array_ativos = ['VALE5','CSNA3','PETR4','USIM5','GOLL4','GGBR4','GOAU4'];

array_valores['VALE5'] = 21;
array_valores['USIM5'] = 4.60;
array_valores['CSNA3'] = 10;
array_valores['PETR4'] = 18;
array_valores['GOLL4'] = 8;
array_valores['GGBR4'] = 11;
array_valores['GOAU4'] = 4.80;





getUrl('VALE5');


function getUrl(ativo){

papel =  array_ativos[chance.integer({min: 0, max: 6})];

//se passar o PRIMEIRO paramentro na linha de entrada +1 +2 ou +3 ele aumenta a força
if (process.argv[2] == '+1') 
	qtde = chance.integer({min: 1, max: 40})*100;
if (process.argv[2] == '+2') 
	qtde = chance.integer({min: 1, max: 50})*100;
if (process.argv[2] == '+3') 
	qtde = chance.integer({min: 1, max: 100})*100;
else
qtde = chance.integer({min: 1, max: 20})*100;

preco = chance.floating({min: 75, max: 125}) * array_valores[papel] /100;

var options = { method: 'POST',
  url: 'http://192.168.200.128:3000/comprar',
  headers:
   { 'postman-token': '0c17b7e5-ee61-6514-60af-a7384edb97dc',
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form:
   { id_corretora: '13',
     id_cliente: '27',
     ativo: papel,
     quantidade: qtde,
     valor: preco, 
     token: '1234abcd' } };
console.log();
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
	
	obj = JSON.parse(body)
	if (obj.Compra)
		console.log (obj.valor);
	
  });

};






 

//
//var request = require('request');
//
//var options = {
//  uri: 'https://www.googleapis.com/urlshortener/v1/url',
//  method: 'POST',
//  json: {
//    "longUrl": "http://www.google.com/"
//  }
//};
//
//request(options, function (error, response, body) {
//  if (!error && response.statusCode == 200) {
//    console.log(body.id) // Print the shortened url.
//  }
//});
//
//
//
//
