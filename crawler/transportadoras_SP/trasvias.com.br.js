var crawlerjs = require('crawler-js');
var fs = require ('fs');
var json2csv = require('json2csv');

//CONFIG
var filename='lista-de-transportadoras.csv';
fields = ['id','empresa','dados'];
indice = 1;
fs.writeFile(filename);


crawler = {
	interval: 1000,
	getSample: 'http://www.transvias.com.br/1/25/transportadoras/Sao-Paulo',
	get: 'http://www.transvias.com.br/[numbers:1:238:1]/25/transportadoras/Sao-Paulo',
	//get: 'http://www.transvias.com.br/1/25/transportadoras/Sao-Paulo',
	preview: 0,
	extractors: [
		{
		selector: '.tab_box_005',
		callback: function (err,html,url,response) {
				data = {};
//			data.texto = html.text();
//			data.empresa = html.children('p').children('strong').text();
//				if (html)
//				if ( html.children('p')) {
				data.id = indice++;
//				data.empresa = html.children('p').children('strong').text();
				data.empresa = html.text();
				data.dados = html.find('txt_menor2').children('p').text();
				//gravar os campos fields lá de cima e os dados que estao em data. nao pode mudar o primeiro data, é parametro.
				var csv = json2csv({data: data,fields: fields});
				fs.appendFile(filename,csv,function(err) {
					if (err) throw err;
				});
				console.log(data);
				console.log('Arquivo'+ filename + ' salvo!');
//				}
			}
		}
	]

}

crawlerjs(crawler);
