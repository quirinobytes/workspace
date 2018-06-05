var crawlerjs = require('crawler-js');
var fs = require('fs');
var fields = ['valor_FGV_CONSUMER_CONFIDENCE','projecao_FGV_CONSUMER_CONFIDENCE','previo_FGV_CONSUMER_CONFIDENCE'];
var data;



crawler = {
	interval: 100,
	getSample: 'http://br.investing.com/economic-calendar/fgv-consumer-confidence-860',
	get: 'http://br.investing.com/economic-calendar/fgv-consumer-confidence-860',
	preview: 0,
	extractors: [
					{
					selector: 'div#releaseInfo',
					callback: function (err,html,url,response) {
								data = {};
								data.valor_FGV_CONSUMER_CONFIDENCE = html.children('span').eq(1).children('div').text();
								data.projecao_FGV_CONSUMER_CONFIDENCE = html.children('span').eq(2).children('div').text();
								data.previo_FGV_CONSUMER_CONFIDENCE = html.children('span').eq(3).children('div').text();
								data.url_FGV_CONSUMER_CONFIDENCE = url;
								gravarCSN(

			fs.writeFile('../../../csv/all/fgv-consumer-confidence.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			}
		}
	]

}

crawlerjs(crawler);

