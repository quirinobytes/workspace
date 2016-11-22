var crawlerjs = require('crawler-js');
var fs = require('fs');
var json2csv = require('json2csv');

fields = ['valor_ENERGIA_ELETRICA'];



crawler = {
	interval: 100,
	getSample: 'https://www.aeseletropaulo.com.br/poder-publico/prazos-e-tarifas/conteudo/tarifa-de-energia-eletrica',
	get: 'https://www.aeseletropaulo.com.br/poder-publico/prazos-e-tarifas/conteudo/tarifa-de-energia-eletrica',
  preview: 3,
	extractors: [
		{
		selector: '#ctl00_SPWebPartManager1_g_05e7f7cc_6e08_4fa0_801d_af831cb60dc7_ctl00_divTarifasCorporativo table:nth-child(2)',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_ponta_ENERGIA_ELETRICA = html.text();
			data.valor_fora_ponta_ENERGIA_ELETRICA = html.children('tr').eq(1).children('td').eq(0).text();
			data.valor_ultrapassagem_ponta_ENERGIA_ELETRICA = html.children('tr').eq(2).children('td').eq(0).text();
			data.url = url;
			console.log(data);
			console.log(html);
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/energia-eletrica.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});

			}
		}
	]

}

crawlerjs(crawler);

