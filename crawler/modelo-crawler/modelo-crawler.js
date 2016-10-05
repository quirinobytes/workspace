var crawlerjs = require('crawler-js');



crawler = {
	interval: 1000,
	getSample: '',
	get: '',
	preview: 1,
	extractors: [
		{
		selector: '',
		callback: function (err,html,url,response) {
			data = {};
			data.nome = html
			data.filial = html.children('').eq(2).text();
			//console.log(data);
			}
		}
	]

}

crawlerjs(crawler);
