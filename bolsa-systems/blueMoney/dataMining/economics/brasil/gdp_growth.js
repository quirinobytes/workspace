#!/usr/bin/env node
var crawlerjs = require('crawler-js');
var fs = require('fs');
var fields = ['valor_BRASIL_GROWTH_RATE','valor_BRASIL_ANUAL_GROWTH','valor_BRASIL_GDP','valor_BRASIL_GDP_CONSTANT_PRICES','valor_BRASIL_GROSS_NATIONAL_PRODUCT','valor_BRASIL_GROSS_FIXED_CAPITAL_FORMATION','valor_BRASIL_GDP_PERCAPITA','valor_BRASIL_GDP_PERCAPITA_PPP','valor_BRASIL_GDP_FROM_AGRICULTURE','valor_BRASIL_GDP_FROM_CONSTRUCTION','valor_BRASIL_GDP_FROM_MANUFACTURING','valor_BRASIL_GDP_FROM_MINING','valor_BRASIL_GDP_FROM_PUBLIC_ADMINISTRATION','valor_BRASIL_GDP_FROM_SERVICES','valor_BRASIL_GDP_FROM_TRANSPORT','valor_BRASIL_GDP_FROM_UTILITIES'];
var data;

crawler = {
	interval: 100,
	getSample: 'http://www.tradingeconomics.com/brazil/gdp/forecast',
	get: 'http://www.tradingeconomics.com/brazil/gdp/forecast',
	preview: 0,
	extractors: [
					{
					selector: '#aspnetForm div.container div.row div.col-lg-8.col-md-9 div:nth-child(11) div table',
					callback: function (err,html,url,response) {
						data = {};
						data.valor_BRASIL_GROWTH_RATE = html.children('tr').eq(0).children('td').eq(1).children('span').text();
						data.valor_BRASIL_ANUAL_GROWTH = html.children('tr').eq(1).children('td').eq(1).children('span').text();
						data.valor_BRASIL_GDP = html.children('tr').eq(2).children('td').eq(1).text();
						data.valor_BRASIL_GDP_CONSTANT_PRICES = html.children('tr').eq(3).children('td').eq(1).text();
						data.valor_BRASIL_GROSS_NATIONAL_PRODUCT = html.children('tr').eq(4).children('td').eq(1).text();
						data.valor_BRASIL_GROSS_FIXED_CAPITAL_FORMATION = html.children('tr').eq(5).children('td').eq(1).text();
						data.valor_BRASIL_GDP_PERCAPITA = html.children('tr').eq(6).children('td').eq(1).text();
						data.valor_BRASIL_GDP_PERCAPITA_PPP = html.children('tr').eq(7).children('td').eq(1).text();
						data.valor_BRASIL_GDP_FROM_AGRICULTURE = html.children('tr').eq(8).children('td').eq(1).text();
						data.valor_BRASIL_GDP_FROM_CONSTRUCTION = html.children('tr').eq(9).children('td').eq(1).text();
						data.valor_BRASIL_GDP_FROM_MANUFACTURING = html.children('tr').eq(10).children('td').eq(1).text();
						data.valor_BRASIL_GDP_FROM_MINING = html.children('tr').eq(11).children('td').eq(1).text();
						data.valor_BRASIL_GDP_FROM_PUBLIC_ADMINISTRATION = html.children('tr').eq(12).children('td').eq(1).text();
						data.valor_BRASIL_GDP_FROM_SERVICES = html.children('tr').eq(13).children('td').eq(1).text();
						data.valor_BRASIL_GDP_FROM_TRANSPORT = html.children('tr').eq(14).children('td').eq(1).text();
						data.valor_BRASIL_GDP_FROM_UTILITIES = html.children('tr').eq(15).children('td').eq(1).text();
						console.log("gravando");
						gravarCSV(data);
						}
					}
	]
}

function gravarCSV (data) {
		  console.log("BRASIL_GDP= "+data.valor_BRASIL_GROWTH_RATE+" | "+ data.valor_BRASIL_ANUAL_GROWTH + " | "+ data.valor_BRASIL_GDP);
      if (data.valor_BRASIL_GROWTH_RATE && data.valor_BRASIL_ANUAL_GROWTH && data.valor_BRASIL_GDP ) {
          csv = '"'+ fields[0] + '"';
          csv+= ',';
          csv+= '"'+ fields[1]+ '"';
          csv+= ',';
          csv+= '"'+ fields[2]+ '"';
          csv+= '\n';
          csv+= '"'+ data.valor_BRASIL_GROWTH_RATE + '"';
          csv+= ',';
          csv+= '"'+ data.valor_BRASIL_ANUAL_GROWTH + '"';
          csv+= ',';
          csv+= '"'+ data.valor_BRASIL_GDP + '"';
          csv+= '\n';
          fs.writeFile('../../../csv/all/brazil_gdp.csv', csv, function(err){ if (err) throw err; });
		  console.log("BRASIL_GDP= "+data.valor_BRASIL_GROWTH_RATE+" | "+ data.valor_BRASIL_ANUAL_GROWTH + " | "+ data.valor_BRASIL_GDP);
      }
}


crawlerjs(crawler);

