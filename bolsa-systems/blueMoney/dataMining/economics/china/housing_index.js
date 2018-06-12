#!/usr/bin/env node 
var crawlerjs = require('crawler-js');
var fs = require('fs');
var fields = ['valor_HOUSING_INDEX_LAST','valor_HOUSING_INDEX_PREVIOUS','valor_HOUSING_INDEX_HIGHEST','valor_HOUSING_INDEX_LOWEST','valor_HOUSING_OWNERSHIP_RATE_LAST','valor_HOUSING_OWNERSHIP_RATE_PREVIOUS','valor_HOUSING_OWNERSHIP_RATE_HIGHEST','valor_HOUSING_OWNERSHIP_RATE_LOWEST'];
var data;


crawler = {
	interval: 100,
	getSample: 'https://www.tradingeconomics.com/china/housing-index',
	get: 'https://www.tradingeconomics.com/china/housing-index',
	preview: 0,
	extractors: [
		{
		selector: '#aspnetForm div.container div.row div.col-lg-8.col-md-9 div:nth-child(11) div table',
		callback: function (err,html,url,response) {
			data = {};
//			data.texto = html.children('tr').children('.datatable-item-first').children('a').text();

			data.valor_HOUSING_INDEX_LAST = html.children('tr').eq(0).children('td').eq(1).text();
			data.valor_HOUSING_INDEX_PREVIOUS = html.children('tr').eq(0).children('td').eq(2).text();
			data.valor_HOUSING_INDEX_HIGHEST = html.children('tr').eq(0).children('td').eq(3).text();
			data.valor_HOUSING_INDEX_LOWEST = html.children('tr').eq(0).children('td').eq(4).text();

			data.valor_HOUSING_OWNERSHIP_RATE_LAST = html.children('tr').eq(1).children('td').eq(1).text();
			data.valor_HOUSING_OWNERSHIP_RATE_PREVIOUS = html.children('tr').eq(1).children('td').eq(2).text();
			data.valor_HOUSING_OWNERSHIP_RATE_HIGHEST = html.children('tr').eq(1).children('td').eq(3).text();
			data.valor_HOUSING_OWNERSHIP_RATE_LOWEST = html.children('tr').eq(1).children('td').eq(4).text();
			gravarCSV(data);
			}
		}
	]

}

function gravarCSV (data) {
//      if (data.valor_HOUSING_INDEX && data.valorizacao_HOUSING_INDEX && data.percentual_HOUSING_INDEX) {
          csv = '"'+ fields[0] + '"';
          csv+= ',';
          csv+= '"'+ fields[1]+ '"';
          csv+= ',';
          csv+= '"'+ fields[2]+ '"';
          csv+= '\n';
          csv+= '"'+ data.valor_HOUSING_INDEX + '"';
          csv+= ',';
          csv+= '"'+ data.valor_HOUSING_INDEX_PREVIOUS + '"';
          csv+= ',';
          csv+= '"'+ data.valor_HOUSING_INDEX_HIGHEST + '"';
          csv+= '\n';
          fs.writeFile('../../../csv/all/economics-china-housing_index.csv', csv, function(err){ if (err) throw err; });
		  console.log("HOUSING_INDEX= "+data.valor_HOUSING_INDEX+" | "+ data.valor_HOUSING_INDEX_PREVIOUS + " | "+ data.valor_HOUSING_INDEX_HIGHEST);

  //    }
}
crawlerjs(crawler);

