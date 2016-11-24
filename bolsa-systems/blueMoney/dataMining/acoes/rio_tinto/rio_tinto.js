var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');

fields = ['valor_RIO_TINTO','valorizacao_RIO_TINTO','percentual_RIO_TINTO'];



crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/equities/rio-tinto-plc-exch',
	get: 'http://www.investing.com/equities/rio-tinto-plc-exch',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_RIO_TINTO = html.children('span').eq(0).text();
			data.valorizacao_RIO_TINTO = html.children('span').eq(1).text();
			data.percentual_RIO_TINTO = html.children('span').eq(3).text();
			data.url = url;
			console.log(data);
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('/root/workspace/bolsa-systems/blueMoney/csv/all/rio-tinto.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			}
		}
	]

}

crawlerjs(crawler);

