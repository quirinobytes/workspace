var crawlerjs = require('crawler-js');



crawler = {
	interval: 1000,
	getSample: 'http://www.transvias.com.br/1/25/transportadoras/Sao-Paulo',
	//get: 'http://www.transvias.com.br/[numbers:1:238:1]/25/transportadoras/Sao-Paulo',
	get: 'http://www.transvias.com.br/1/25/transportadoras/Sao-Paulo',
	preview: 3,
	extractors: [
		{
		//selector: 'body table:nth-child(5) tr td:nth-child(3)',
		selector: 'body > table:nth-child(5) > tr > td:nth-child(3) > table > tr > td > table:nth-child(4) > tr > td > table > tr > td:nth-child(1) > strong > a',
		//selector: 'body table:nth-child(5) tr td:nth-child(3) table tr td form table tr:nth-child(2) td',
		//selector: 'body table:nth-child(5) tr td:nth-child(1) table tr:nth-child(4) td:nth-child(2) table:nth-child(4) tr:nth-child(3)',
//body > table:nth-child(5) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table:nth-child(4) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(8) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td.menu_button_off_admin > a
		callback: function (err,html,url,response) {
			data = {};
			data.texto = html.text();
			//data.texto = html.children('tbody').children('tr').children('td').eq(3).children('table').attrib('bgcolor').text();
			//data.registro = html.chidren('table').chidren('tr').children('td').text();
			//data.filial = html.children('').eq(2).text();
			console.log(data);
			console.log(html);
			//console.log(response);
			}
		}
	]

}

crawlerjs(crawler);
