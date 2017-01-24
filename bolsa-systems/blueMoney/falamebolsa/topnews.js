var crawlerjs = require('crawler-js');
var request = require('request');
var fs = require('fs');
//var json2csv = require('json2csv');
//fields = ['valor_VALE5','valorizacao_VALE5','percentual_VALE5'];
//var url_LOADPRICE = 'http://192.168.200.128:3000/loadprice' ;


var real_url = process.argv[2];

var dividida = real_url.split("|");

fs.writeFile("/var/www/webserver/arquivos/news/"+ dividida[1]+ ".json","");

crawler = {
	interval: 100,
	getSample: dividida[0],
	get: dividida[0],
  	preview: 3,
	extractors: [
		{
		selector: '#leftColumn > div.mediumTitle1 article',
		callback: function (err,html,url,response) {
			//console.log(html.children('a').attr("href"));	
			data = {};
			var dia = html.children('div').children('span').children('span').text().match('horas');
			//caso contenha horas é pq é noticia do dia,ex.: ha tantas 'horas' atras....
			if (dia)
			{
				data.content = html.children('a').attr("href");
				data.titulo = html.children("div").children("a").attr("title");

				//so grava se houver dados
				if (data){
					fs.appendFile('/var/www/webserver/arquivos/news/'+dividida[1]+'.json', JSON.stringify(data)+",", function(err) {
						//		if (err) throw err;
						//			console.log(err);
						//
					});
				}
			}
			console.log(JSON.stringify(data));
			}
		}
	]

}

crawlerjs(crawler);







