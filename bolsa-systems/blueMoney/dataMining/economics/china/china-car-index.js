var crawlerjs = require('crawler-js');


crawler = {
	interval: 100,
	getSample: 'http://www.tradingeconomics.com/china/housing-index',
	get: 'http://www.tradingeconomics.com/china/housing-index',
  preview: 3,
	extractors: [
		{
		selector: '.panel .table-responsive .table.table-condensed.table-hover',
		callback: function (err,html,url,response) {
			data = {};
			data.texto = html.children('tr').children('.datatable-item-first').children('a').text();
			data.valor = html.children('tr').children('td').eq(1).text();
			data.url = url;
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);

