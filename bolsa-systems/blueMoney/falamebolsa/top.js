var crawlerjs = require('crawler-js');
var request = require('request');
var fs = require('fs');
fs.writeFile("/var/www/webserver/arquivos/news/vale5.json","");
var json2csv = require('json2csv');
fields = ['valor_VALE5','valorizacao_VALE5','percentual_VALE5'];
var url_LOADPRICE = 'http://192.168.200.128:3000/loadprice' ;


var real_url = process.argv[2];

var dividida = real_url.split("|");

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
			data.content = html.children('a').attr("href");
			data.titulo = html.children("div").children("a").attr("title");
//			data.valor_VALE5 = html.children('span').eq(0).text();
//			data.valorizacao_VALE5 = html.children('span').eq(1).text();
//			data.percentual_VALE5 = html.children('span').eq(3).text();
//			data.url = url;
//			var csv = json2csv({ data: data, fields: fields });


			fs.appendFile('/var/www/webserver/arquivos/news/'+dividida[1]+'.json', JSON.stringify(data)+",", function(err) {

//			if (err) throw err;
//				console.log(err);
//
			});
			

//			loadPrice(data);
			console.log(JSON.stringify(data));
			}
		}
	]

}

crawlerjs(crawler);







