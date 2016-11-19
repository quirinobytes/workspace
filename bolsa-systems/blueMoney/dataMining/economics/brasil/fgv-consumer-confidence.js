var crawlerjs = require('crawler-js');


crawler = {
	interval: 100,
	getSample: 'http://br.investing.com/economic-calendar/fgv-consumer-confidence-860',
	get: 'http://br.investing.com/economic-calendar/fgv-consumer-confidence-860',
  preview: 3,
	extractors: [
		{
		selector: 'div#releaseInfo',
		callback: function (err,html,url,response) {
			data = {};
			data.titulo = "Brasil - Confiança do Consumidor"
			data.atual = html.children('span').eq(1).children('div').text();
			data.projecao = html.children('span').eq(2).children('div').text();
			data.previo = html.children('span').eq(3).children('div').text();
			data.url = url;
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);

