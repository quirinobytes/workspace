var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');

fields = ['valor_IRON_FE62','valorizacao_IRON_FE62','percentual_IRON_FE62'];



crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/commodities/iron-ore-62-cfr-futures',
	get: 'http://www.investing.com/commodities/iron-ore-62-cfr-futures',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_IRON_FE62 = html.children('span').eq(0).text();
			data.valorizacao_IRON_FE62 = html.children('span').eq(1).text();
			data.percentual_IRON_FE62 = html.children('span').eq(3).text();
			data.url = url;
			console.log(data);
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/iron-fe62.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			}
		}
	]

}

crawlerjs(crawler);

