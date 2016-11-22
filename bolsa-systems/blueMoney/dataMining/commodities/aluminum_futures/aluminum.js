var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');

fields = ['valor_ALUMINUM','valorizacao_ALUMINUM','percentual_ALUMINUM'];



crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/commodities/aluminum',
	get: 'http://www.investing.com/commodities/aluminum',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_ALUMINUM = html.children('span').eq(0).text();
			data.valorizacao_ALUMINUM = html.children('span').eq(1).text();
			data.percentual_ALUMINUM = html.children('span').eq(3).text();
			data.url = url;
			console.log(data);
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/aluminum.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			}
		}
	]

}

crawlerjs(crawler);

