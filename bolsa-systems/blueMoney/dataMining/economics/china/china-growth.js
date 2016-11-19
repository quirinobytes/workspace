var crawlerjs = require('crawler-js');


crawler = {
	interval: 100,
	getSample: 'http://www.tradingeconomics.com/china/gdp',
	get: 'http://www.tradingeconomics.com/china/gdp',
  preview: 3,
	extractors: [
		{
		selector: '.panel-default .table-responsive table',
		callback: function (err,html,url,response) {
			data = {};
			data.texto = html.children('tr').children('td').eq(0).text();
			data.valor = html.children('tr').children('td').eq(1).text();
			data.url = url;
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);

