var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');


fields = ['valor_COOPER_UK','valorizacao_COOPER_UK','percentual_COOPER_UK'];



crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/commodities/copper?cid=959211',
	get: 'http://www.investing.com/commodities/copper?cid=959211',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_COOPER_UK = html.children('span').eq(0).text();
			data.valorizacao_COOPER_UK = html.children('span').eq(1).text();
			data.percentual_COOPER_UK = html.children('span').eq(3).text();
			data.url = url;
			console.log(data);
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/cooper_UK.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			}
		}
	]

}

crawlerjs(crawler);

