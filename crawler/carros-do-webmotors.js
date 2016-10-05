var crawlerjs = require('crawler-js');



crawler = {
	interval: 1000,
	getSample: 'http://www.webmotors.com.br/carros/estoque?tipoveiculo=carros&estadocidade=estoque&qt=12&o=1&p=1',
	get: 'http://www.webmotors.com.br/carros/estoque?tipoveiculo=carros&estadocidade=estoque&qt=12&o=1&p=[numbers:1:17262:1]',
	preview: 3,
	extractors: [
		{
		selector: 'anuncios',
		callback: function (err,html,url,response) {
			data = {};
			data.modelo = html
			//data.filial = html.children('').eq(2).text();
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);
