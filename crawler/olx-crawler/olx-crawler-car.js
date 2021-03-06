#!/usr/bin/env node

// MEU Primeiro Crawler Descente.

var bd = require('./config/bd.js');
var crawlerjs = require('crawler-js');
var fs = require ('fs');
//var jsonfile = require('jsonfile');
var appendjson = require('appendjson');
var total_data=0;

//CONFIG
var file = 'carros.json';
fs.writeFile('carros.json');
fs.appendFile('carros.json','[');


crawler = {
	interval: 2000,

    //getSample: 'http://sp.olx.com.br/sao-paulo-e-regiao/outras-cidades/veiculos/carros?',
	getSample: 'http://sp.olx.com.br/veiculos-e-acessorios/carros?q=carros',

    //get: 'http://sp.olx.com.br/sao-paulo-e-regiao/outras-cidades/veiculos/carros?o=[numbers:1:823:1]',
    get: 'http://sp.olx.com.br/veiculos-e-acessorios/carros?q=carros&o=[numbers:1:100:1]',
	preview: 3,
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

					jsonObj = {Carro: item.carro, Ano: item.ano, Valor: item.valor}

					//calculando o total de dados recebidos.
					total_data= total_data + JSON.stringify(jsonObj).length /1024 ;

					//imprimindo o total de dados.
					process.stdout.write ('\r'+ total_data.toFixed(2) + ' Kbytes  ');


					fs.appendFile('carros.json',JSON.stringify(jsonObj)+','); 

				}
			}else{
			console.log(err);
			}
						}
		}

	]

}


function finaliza(){
	 console.log("Rodei a finaliza e escrevi o ] no arquivo");
	 fs.appendFile('carros.json',']');
};

crawlerjs(crawler);
//process.nextTick(finaliza);


