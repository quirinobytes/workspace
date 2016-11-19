var crawlerjs = require('crawler-js');


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
			data.valor = html.children('span').eq(0).text();
			data.valorizacao = html.children('span').eq(1).text();
			data.percentual = html.children('span').eq(3).text();
			data.url = url;
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);

