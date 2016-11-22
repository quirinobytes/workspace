var crawlerjs = require('crawler-js');
var json2csv = require('json2csv');
var fs = require('fs');
fields = ['valor_CLIFF','valorizacao_CLIFF','percentual_CLIFF'];

crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/equities/cleveland-cliffs',
	get: 'http://www.investing.com/equities/cleveland-cliffs',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_CLIFF = html.children('span').eq(0).text();
			data.valorizacao_CLIFF = html.children('span').eq(1).text();
			data.percentual_CLIFF = html.children('span').eq(3).text();
//			data.url = url;
			console.log(data);
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/cliff.csv', csv, function(err) {
				if (err) throw err;
					 console.log('file saved');
			});

			}
		}
	]

}

crawlerjs(crawler);

