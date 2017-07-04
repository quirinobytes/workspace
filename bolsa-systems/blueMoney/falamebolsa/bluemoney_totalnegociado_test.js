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
	getSample: "http://bluemoney.antidrone.com.br:3000/",
	get: "http://bluemoney.antidrone.com.br:3000/" ,
  	preview: 0,
	extractors: [
		{
		selector: '#totalajax',
		callback: function (err,html,url,response) {
			//console.log(JSON.stringify(html));
			console.log(html);
			}
		}
	]

}

crawlerjs(crawler);







