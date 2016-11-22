var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');
fields = ['valor_ANGLO','valorizacao_ANGLO','percentual_ANGLO'];

			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/anglo-american.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});



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

