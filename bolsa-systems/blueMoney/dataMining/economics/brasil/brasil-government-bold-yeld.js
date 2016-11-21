var crawlerjs = require('crawler-js');


crawler = {
	interval: 100,
	getSample: 'http://pt.tradingeconomics.com/brazil/government-bond-yield',
	get: 'http://pt.tradingeconomics.com/brazil/government-bond-yield',
  preview: 3,
	extractors: [
		{
		selector: '#ctl00_ContentPlaceHolder1_ctl02_PanelDefinition div .table-condensed tr',
		callback: function (err,html,url,response) {
			data = {};
			data.titulo = "Custo de capital de emissões nacionais nos mercados globais";
			data.valor = html.children('td').eq(1).text();
			data.anterior = html.children('td').eq(2).text();
			data.maior = html.children('td').eq(3).text();
			data.menor = html.children('td').eq(4).text();
			data.url = url;
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);

