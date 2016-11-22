var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');

fields = ['valor_IBOVESPA','valorizacao_IBOVESPA','percentual_IBOVESPA'];



crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/indices/ibovespa-futures',
	get: 'http://www.investing.com/indices/ibovespa-futures',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_IBOVESPA = html.children('span').eq(0).text();
			data.valorizacao_IBOVESPA = html.children('span').eq(1).text();
			data.percentual_IBOVESPA = html.children('span').eq(3).text();
			data.url = url;
			console.log(data);
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/ibovespa.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			}
		}
	]

}

crawlerjs(crawler);

