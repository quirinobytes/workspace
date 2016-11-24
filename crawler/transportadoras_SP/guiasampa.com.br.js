var crawlerjs = require('crawler-js');



crawler = {
	interval: 1000,
	getSample: 'http://guiadesampa.com.br/depto.asp?depto=transportadoras&pag=2&mul=1',
	get: 'http://guiadesampa.com.br/depto.asp?depto=transportadoras&pag=[numbers:1:9:1]&mul=1',
	preview: 0,
	extractors: [
		{
		selector: '#interna > div',
		callback: function (err,html,url,response) {
			data = {};
			data.texto = html.text();
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);
