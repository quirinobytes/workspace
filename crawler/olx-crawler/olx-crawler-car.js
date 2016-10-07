var crawlerjs = require('crawler-js');
var fs = require ('fs');


crawler = {
	interval: 500,
	getSample: 'http://sp.olx.com.br/sao-paulo-e-regiao/outras-cidades/veiculos/carros?',
	get: 'http://sp.olx.com.br/sao-paulo-e-regiao/outras-cidades/veiculos/carros?o=[numbers:1:820:1]',
	preview: 0,
	extractors: [
		{
		selector: '#main-ad-list li.item',
		callback: function (err,html,url,response) {

			if(!err){
	
			data = {};
			var modelo =  html.find('h3').text().trim().split('-');
			data.carro = modelo[0];
			data.ano = modelo[1];
			data.valor = html.find('div.col-3').text();

				if ((data.carro == '') || (data.valor == '')) {
           				delete data.carro;
					delete data.valor;
				}
				else {
					//console.log('Carro: ' + data.carro + ' \t| Ano: ' + data.ano + '\t| Valor: ' + data.valor + '\n');
					fs.appendFile('carros-do-olx.txt','Carro: ' + data.carro + ' \t| Ano: ' + data.ano + '\t| Valor: ' + data.valor + '\n');
			     	}
				}
			else{
			console.log(err);
			}
			}
		}
	]
}


crawlerjs(crawler);
