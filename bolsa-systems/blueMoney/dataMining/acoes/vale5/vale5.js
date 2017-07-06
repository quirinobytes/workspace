#!/usr/bin/env node
var crawlerjs = require('crawler-js');
var request = require('request');
var fs = require('fs');
var json2csv = require('json2csv');
fields = ['valor_VALE5','valorizacao_VALE5','percentual_VALE5'];
var url_LOADPRICE = 'http://192.168.200.128:3000/loadprice' ;



crawler = {
	interval: 100,
	getSample: 'https://www.investing.com/equities/vale-pna-n1',
	get: 'https://www.investing.com/equities/vale-pna-n1',
  preview: 3,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_VALE5 = html.children('span').eq(0).text();
			data.valorizacao_VALE5 = html.children('span').eq(1).text();
			data.percentual_VALE5 = html.children('span').eq(3).text();
			data.url = url;
			var csv = json2csv({ data: data, fields: fields });

			fs.writeFile('../../../csv/all/vale5.csv', csv, function(err) {
			if (err) throw err;
				console.log('file saved');

			});
			

			loadPrice(data);
			console.log(data);
			}
		}
	]

}

crawlerjs(crawler);


function loadPrice(data){



var options = { method: 'POST',
     url: url_LOADPRICE,
     headers:
      { 'postman-token': '0c17b7e5-ee61-6514-60af-a7384edb97dc',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded' },
     form:
      { ativo: 'VALE5',
        valor: data.valor_VALE5,
        token: '1234abcd'
      }
    };
//fazendo o request(POST) para atualizar o preço.
 req = request(options, function (error, response, body) {
        if(error) throw new Error(error)
			console.log(error)

	});

console.log( data.valor_VALE5);


}
