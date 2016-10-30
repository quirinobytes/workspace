#!/usr/bin/env node
var request = require('request');
var Chance = require('chance');
var chance = new Chance();

var totalUrl = 1;


array_ativos = ['VALE5','CSNA3','PETR4','USIM5','GOLL4','GGBR4','GOAU4'];



getUrl('VALE5');


function getUrl(ativo){

papel =  array_ativos[chance.integer({min: 0, max: 6})];
qtde = chance.floating({min: 100, max: 10000});
preco = chance.floating({min: 0.01, max: 23.99});

var options = { method: 'POST',
  url: 'http://189.55.194.115:3000/vender',
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


  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
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
