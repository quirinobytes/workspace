#!/usr/bin/env node

// MEU Primeiro Crawler Descente.

//var bd = require('./config/bd.js');
var crawlerjs = require('crawler-js');
var fs = require ('fs');
//var jsonfile = require('jsonfile');
var appendjson = require('appendjson');


//CONFIG
var file = 'carros.json';
fs.appendFile('carros.json','['); 


crawler = {
	interval: 200,
	getSample: 'http://sp.olx.com.br/sao-paulo-e-regiao/outras-cidades/veiculos/carros?',
	get: 'http://sp.olx.com.br/sao-paulo-e-regiao/outras-cidades/veiculos/carros?o=[numbers:1:823:1]',
	preview: 0,
	extractors: [
		{
		selector: '#main-ad-list li.item',
		callback: function (err,html,url,response) {

			if(!err){

			item = {};
			var modelo =  html.find('h3').text().trim().split('-');
			item.carro = modelo[0];
			item.ano = modelo[1];
			item.valor = html.find('div.col-3').text().trim();

				if ((item.carro == '') || (item.valor == '')) {
           				delete item.carro;
					delete item.valor;
				}
				else {
					//console.log('Carro: ' + item.carro + ' \t| Ano: ' + item.ano + '\t| Valor: ' + item.valor + '\n');
					//fs.appendFile('carros.json','{\n "Carro": "' + item.carro + '",\n "Ano": "' + item.ano + '",\n "Valor": "' + item.valor + '" \n }\n');		 
//					
//
					jsonObj = {Carro: item.carro, Ano: item.ano, Valor: item.valor}
					//console.log (jsonObj);
					//appendjson(jsonObj, file, function(){
					//console.log('done')


					fs.appendFile('carros.json',JSON.stringify(jsonObj)+','); 
					//bd.insert(jsonObj);

				}
			}else{
			console.log(err);
			}
						}
		}

	]

}

var exe_after = function finaliza(){
	 fs.appendFile('carros.json',']');
};

crawlerjs(crawler,exe_after);


