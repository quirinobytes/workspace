#!/usr/bin/env node
var request = require('request');
var totalUrl = 1000;


//for( var i = 0; i < totalUrl; i++ ) {
while (true){
	(500);
	getUrl('VALE5');
}





function getUrl(ativo){

var options = { method: 'POST',
  url: 'http://189.55.194.115:3000/vender',
  headers: 
   { 'postman-token': '0c17b7e5-ee61-6514-60af-a7384edb97dc',
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form: 
   { id_corretora: '13',
     id_cliente: '27',
     ativo: 'VALE5',
     quantidade: '900',
     valor: '6.31',
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