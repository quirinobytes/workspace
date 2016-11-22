var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');
fields = ['valor_CSNA3','valorizacao_CSNA3','percentual_CSNA3'];



crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/equities/sid-nacional-on',
	get: 'http://www.investing.com/equities/sid-nacional-on',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_CSNA3 = html.children('span').eq(0).text();
			data.valorizacao_CSNA3 = html.children('span').eq(1).text();
			data.percentual_CSNA3 = html.children('span').eq(3).text();
			data.url = url;
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/csna3.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);

