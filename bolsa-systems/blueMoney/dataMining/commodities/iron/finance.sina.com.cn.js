var crawlerjs = require('crawler-js');


crawler = {
	interval: 100,
	getSample: 'http://finance.sina.com.cn/futures/quotes/I0.shtml?from=wap',
	get: 'http://finance.sina.com.cn/futures/quotes/I0.shtml?from=wap',
  preview: 3,
	extractors: [
		{
		selector: '#box-latest-futures table tr',
		callback: function (err,html,url,response) {
			data = {};
			data.valor = html.children('td').eq(1).children('span').text();
			data.valorizacao = html.children('td').text();
			data.url = url;
			console.log(html);
			}
		}
	]

}

crawlerjs(crawler);

