var crawlerjs = require('crawler-js');
var fs = require('fs');
var fields = ['valor_BHP','valorizacao_BHP','percentual_BHP'];
var data;



crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/equities/bhp-billiton-limited?cid=23647',
	get: 'http://www.investing.com/equities/bhp-billiton-limited?cid=23647',
	preview: 0,
	extractors: [
				{
				selector: 'div div div div div .top',
				callback: function (err,html,url,response) {
					data = {};
					data.valor_BHP = html.children('span').eq(0).text();
					data.valorizacao_BHP = html.children('span').eq(1).text();
					data.percentual_BHP = html.children('span').eq(3).text();
					data.valor_VALE5 = data.valor_VALE5.replace(",", "");
					data.valorizacao_VALE5 = data.valorizacao_VALE5.replace(/[+,%]/g, "");
					data.percentual_VALE5 = data.percentual_VALE5.replace(/[+,%]/g, "");
		            gravarCSV(data);			
					}
				}
	]

}
function gravarCSV (data) {
      if (data.valor_VALE5 && data.valorizacao_VALE5 && data.percentual_VALE5) {
          csv = '"'+ fields[0] + '"';
          csv+= ',';
          csv+= '"'+ fields[1]+ '"';
          csv+= ',';
          csv+= '"'+ fields[2]+ '"';
          csv+= '\n';
          csv+= '"'+ data.valor_VALE5 + '"';
          csv+= ',';
          csv+= '"'+ data.valorizacao_VALE5 + '"';
          csv+= ',';
          csv+= '"'+ data.percentual_VALE5 + '"';
          csv+= '\n';
          fs.writeFile('../../../csv/all/bhp.csv', csv, function(err){ if (err) throw err; });
          loadPrice();
		  console.log("VALE5= "+data.valor_VALE5+" | "+ data.valorizacao_VALE5 + " | "+ data.percentual_VALE5);
      }
}
crawlerjs(crawler);

