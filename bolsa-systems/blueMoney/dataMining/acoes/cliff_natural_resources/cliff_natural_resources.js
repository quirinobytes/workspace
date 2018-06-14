var crawlerjs = require('crawler-js');
var fs = require('fs');
var fields = ['valor_CLIFF','valorizacao_CLIFF','percentual_CLIFF'];
var data;

crawler = {
	interval: 100,
	getSample: 'http://www.investing.com/equities/cleveland-cliffs',
	get: 'http://www.investing.com/equities/cleveland-cliffs',
    preview: 0,
	extractors: [
					{
					selector: 'div div div div div .top',
					callback: function (err,html,url,response) {
								data = {};
								data.valor_CLIFF = html.children('span').eq(0).text();
								data.valorizacao_CLIFF = html.children('span').eq(1).text();
								data.percentual_CLIFF = html.children('span').eq(3).text();
	 							data.valor_CLIFF = data.valor_CLIFF.replace(",", "");
								data.valorizacao_CLIFF = data.valorizacao_CLIFF.replace(/[+,%]/g, "");
								data.percentual_CLIFF = data.percentual_CLIFF.replace(/[+,%]/g, "");
								gravarCSV(data);
								}
					}
				]
}

function gravarCSV (data) {
      if (data.valor_CLIFF && data.valorizacao_CLIFF && data.percentual_CLIFF) {
          csv = '"'+ fields[0] + '"';
          csv+= ',';
          csv+= '"'+ fields[1]+ '"';
          csv+= ',';
          csv+= '"'+ fields[2]+ '"';
          csv+= '\n';
          csv+= '"'+ data.valor_CLIFF + '"';
          csv+= ',';
          csv+= '"'+ data.valorizacao_CLIFF + '"';
          csv+= ',';
          csv+= '"'+ data.percentual_CLIFF + '"';
          csv+= '\n';
          fs.writeFile('../../../csv/all/cliff.csv', csv, function(err){ if (err) throw err; });
		  console.log("CLIFF= "+data.valor_CLIFF+" | "+ data.valorizacao_CLIFF + " | "+ data.percentual_CLIFF);
      }
}

crawlerjs(crawler);

