var crawlerjs = require('crawler-js');


crawler = {
	interval: 100,
	getSample: 'http://www.infomine.com/investment/metal-prices/iron-ore-pellets/1-year/',
	get: 'http://www.infomine.com/investment/metal-prices/iron-ore-pellets/1-year/',
  preview: 3,
	extractors: [
		{
		selector: '#litTickerHeaderText',
		callback: function (err,html,url,response) {
			data = {};
			data.nome = html.text();
			data.retrospecto = html.children('span').eq(0).text();
			data.url = url;
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);

