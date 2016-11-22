var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');
fields = ['valor_ANGLO','valorizacao_ANGLO','percentual_ANGLO'];

			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/anglo-american.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});



crawler = {
	interval: 100,
	getSample: 'http://www.tradingeconomics.com/china/industrial-production',
	get: 'http://www.tradingeconomics.com/china/industrial-production',
  preview: 3,
	extractors: [
		{
		selector: '#ctl00_ContentPlaceHolder1_ctl02_PanelDefinition .table-responsive table',
		callback: function (err,html,url,response) {
			data = {};
			data.texto = "China Industrial Production"; 
			data.last = html.children('tr').children('td').eq(1).text();
			data.previous = html.children('tr').children('td').eq(2).text();
			data.url = url;
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);

