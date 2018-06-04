var crawlerjs = require('crawler-js');
var request = require('request');
var fs = require('fs');
fields = ['valor_PETR4','valorizacao_PETR4','percentual_PETR4'];
var url_LOADPRICE = 'http://192.168.200.128:3000/loadprice' ;
var jsonData = {};
var options = {
		    	delimiter : {
				        wrap  : '', // Double Quote (") character
				        field : ',', // Comma field delimiter
				        array : ';', // Semicolon array value delimiter
				        eol   : '\n' // Newline delimiter
			  	},
				prependHeader    : true,
				sortHeader       : false,
				trimHeaderValues : false,
				trimFieldValues  : true,
				keys             : ['valor_PETR4','valorizacao_PETR4','percentual_PETR4']
};


crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/equities/petrobras-pn',
	get: 'http://www.investing.com/equities/petrobras-pn',
    preview: 0,
	extractors: [
		{
		selector: 'div div div div div .top',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_PETR4 = html.children('span').eq(0).text();
			data.valorizacao_PETR4 = html.children('span').eq(1).text();
			data.percentual_PETR4 = html.children('span').eq(3).text().replace('%','');
			jsonData=data;
			gravarCSV(jsonData);
			}
		}
	]
}



function loadPrice(jsonData){

console.log("VALOR="+jsonData.valor_PETR4);

	var options = { method: 'POST',
		 	    	url: url_LOADPRICE,
				    headers: { 'postman-token': '0c17b7e5-ee61-6514-60af-a7384edb97dc',
								'cache-control': 'no-cache',
								'content-type': 'application/x-www-form-urlencoded' },
			     	form: { ativo: 'PETR4', valor: jsonData.valor_PETR4, token: '1234abcd' }
	};

    //fazendo o request(POST) para atualizar o preço.
    req = request(options, function (error, response, body) {
        if(error) throw new Error(error)
			console.log(error)
	});
}

function gravarCSV () {

console.log(jsonData)
if (jsonData.valor_PETR4 && jsonData.valorizacao_PETR4 && jsonData.percentual_PETR4) {
	csv = fields[0];
	csv+= ',';
	csv+= fields[1];
	csv+= ',';
	csv+= fields[2];
	csv+= '\n';
	csv+= jsonData.valor_PETR4;
	csv+= ',';
	csv+= jsonData.valorizacao_PETR4.replace("'","").replace(".",",") ;
	csv+= ',';
	csv+= jsonData.percentual_PETR4 ;
	csv+= '\n';
	console.log("CSV=>");
	console.log(csv);

	fs.writeFile('../../../csv/all/petr4.csv', csv, function(err){ if (err) throw err; });
	loadPrice(jsonData);
}
};

crawlerjs(crawler);
