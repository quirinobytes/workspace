var crawlerjs = require('crawler-js');
var request = require('request');
var fs = require('fs');
fs.writeFile("/var/www/webserver/arquivos/news/vale5.json","");
//var json2csv = require('json2csv');
//fields = ['valor_VALE5','valorizacao_VALE5','percentual_VALE5'];
//var url_LOADPRICE = 'http://192.168.200.128:3000/loadprice' ;


//var real_url = process.argv[2];

//var dividida = real_url.split("|");

crawler = {
	interval: 100,
//	getSample: dividida[0],
	getSample: "https://br.investing.com/equities/vale-pna-n1-news",
	get: "https://br.investing.com/equities/vale-pna-n1-news" ,
  	preview: 0,
	extractors: [
		{
		selector: '#leftColumn > div.mediumTitle1 > article:nth-child(1) > div.textDiv ',
		callback: function (err,html,url,response) {
			//console.log(html.children('a').attr("href"));	
			data = {};
			var page = html;
			if (html)
				console.log(page);
			if (data) fs.appendFile('/var/www/webserver/arquivos/news/vale5.json', JSON.stringify(data)+",", function(err) {
				});
			

//			loadPrice(data);
			console.log(JSON.stringify(page));
			}
		}
	]

}

crawlerjs(crawler);







