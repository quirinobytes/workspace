var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');

fields = ['valor_SP500','valorizacao_SP500','percentual_SP500'];



crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/indices/us-spx-500',
	get: 'http://www.investing.com/indices/us-spx-500',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_SP500 = html.children('span').eq(0).text();
			data.valorizacao_SP500 = html.children('span').eq(1).text();
			data.percentual_SP500 = html.children('span').eq(3).text();
			data.url = url;
			console.log(data);
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/sp500.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			}
		}
	]

}

crawlerjs(crawler);

