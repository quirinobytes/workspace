var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');

fields = ['valor_NICKEL','valorizacao_NICKEL','percentual_NICKEL'];



crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/commodities/nickel?cid=959208',
	get: 'http://www.investing.com/commodities/nickel?cid=959208',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_NICKEL = html.children('span').eq(0).text();
			data.valorizacao_NICKEL = html.children('span').eq(1).text();
			data.percentual_NICKEL = html.children('span').eq(3).text();
			data.url = url;
			console.log(data);
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/nickel.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			}
		}
	]

}

crawlerjs(crawler);

