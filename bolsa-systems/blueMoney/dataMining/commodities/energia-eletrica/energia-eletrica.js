var crawlerjs = require('crawler-js');


crawler = {
	interval: 100,
	getSample: 'https://www.aeseletropaulo.com.br/poder-publico/prazos-e-tarifas/conteudo/tarifa-de-energia-eletrica',
	get: 'https://www.aeseletropaulo.com.br/poder-publico/prazos-e-tarifas/conteudo/tarifa-de-energia-eletrica',
  preview: 3,
	extractors: [
		{
		selector: '.bandeira-tarifa tbody tr',
		callback: function (err,html,url,response) {
			data = {};
			data.valor = html.children('td').eq(0).eq(1).text();
			data.url = url;
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);

