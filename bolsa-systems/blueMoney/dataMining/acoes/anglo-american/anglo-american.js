var crawlerjs = require('crawler-js');
var json2csv = require('json2csv');
var fs = require('fs');
fields = ['valor_ANGLO','valorizacao_ANGLO','percentual_ANGLO'];


crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/equities/anglo-american',
	get: 'http://www.investing.com/equities/anglo-american',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_ANGLO = html.children('span').eq(0).text();
			data.valorizacao_ANGLO = html.children('span').eq(1).text();
			data.percentual_ANGLO = html.children('span').eq(3).text();
			data.url = url;
			console.log(data);

			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/anglo-american.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});
		}
	}
	]

}

crawlerjs(crawler);

