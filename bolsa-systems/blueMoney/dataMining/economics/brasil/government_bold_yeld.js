#!/usr/bin/env node
var crawlerjs = require('crawler-js');
var fs = require('fs');
var fields = ['valor_BRASIL_GROWTH','anterior_BRASIL_GROWTH','maximo_BRASIL_GROWTH','minimo_BRASIL_GROWTH'];
var data;

crawler = {
	interval: 100,
	getSample: 'http://pt.tradingeconomics.com/brazil/government-bond-yield',
	get: 'http://pt.tradingeconomics.com/brazil/government-bond-yield',
    preview: 0,
	extractors: [
					{
					selector: '#ctl00_ContentPlaceHolder1_ctl02_PanelDefinition div table',
					callback: function (err,html,url,response) {
						data = {};
//			data.titulo = "Custo de capital de emissões nacionais nos mercados globais";
						data.valor_BRASIL_GROWTH = html.children('tr').eq(0).children('td').eq(1).text();
						data.anterior_BRASIL_GROWTH = html.children('tr').eq(0).children('td').eq(2).text();
						data.maximo_BRASIL_GROWTH = html.children('tr').eq(0).children('td').eq(3).text();
						data.minimo_BRASIL_GROWTH = html.children('tr').eq(0).children('td').eq(4).text();
						data.valor_BRASIL_GROWTH = data.valor_BRASIL_GROWTH.replace(",", "");
						data.valorizacao_BRASIL_GROWTH = data.valorizacao_BRASIL_GROWTH.replace(/[-+,%]/g, "");
						data.percentual_BRASIL_GROWTH = data.percentual_BRASIL_GROWTH.replace(/[-+,%]/g, "");
						gravarCSV(data);
						}
					}
	]

}

function gravarCSV (data) {
      if (data.valor_BRASIL_GROWTH && data.valorizacao_BRASIL_GROWTH && data.percentual_BRASIL_GROWTH) {
          csv = '"'+ fields[0] + '"';
          csv+= ',';
          csv+= '"'+ fields[1]+ '"';
          csv+= ',';
          csv+= '"'+ fields[2]+ '"';
          csv+= '\n';
          csv+= '"'+ data.valor_BRASIL_GROWTH + '"';
          csv+= ',';
          csv+= '"'+ data.valorizacao_BRASIL_GROWTH + '"';
          csv+= ',';
          csv+= '"'+ data.percentual_BRASIL_GROWTH + '"';
          csv+= '\n';
          fs.writeFile('../../../csv/all/brazil_growth.csv', csv, function(err){ if (err) throw err; });
          loadPrice();
		  console.log("BRASIL_GROWTH= "+data.valor_BRASIL_GROWTH+" | "+ data.valorizacao_BRASIL_GROWTH + " | "+ data.percentual_BRASIL_GROWTH);
      }
}

crawlerjs(crawler);

