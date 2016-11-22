var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');

fields = ['valor_IRON_ORE_PELLETS','maximo_IRON_ORE_PELLETS','minimo_IRON_ORE_PELLETS'];



crawler = {
	interval: 100,
	getSample: 'http://www.infomine.com/investment/metal-prices/iron-ore-pellets/1-year/',
	get: 'http://www.infomine.com/investment/metal-prices/coal/1-year/',
  preview: 3,
	extractors: [
		{
		selector: '#litTickerHeaderText',
		callback: function (err,html,url,response) {
			data = {};
			str = html.text();
			str2 = str.split("USD");

//			console.log (str2);
			valor = str2[0].split("Price");
			low = str2[1].split("Low");
			high = str2[2].split("High");

			data.valor_IRON_ORE_PELLETS  = valor[1];
			data.maximo_IRON_ORE_PELLETS = high[1];
			data.minimo_IRON_ORE_PELLETS = low[1];
			data.url = url;
			console.log(data);
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/iron-ore-pellets.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			}
		}
	]

}

crawlerjs(crawler);

