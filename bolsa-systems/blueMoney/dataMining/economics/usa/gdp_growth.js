#!/usr/bin/env node
var crawlerjs = require('crawler-js');
var fs = require('fs');
var fields = ['valor_USA_GROWTH_RATE','valor_USA_ANUAL_GROWTH','valor_USA_GDP','valor_USA_GDP_CONSTANT_PRICES','valor_USA_GROSS_NATIONAL_PRODUCT','valor_USA_GROSS_FIXED_CAPITAL_FORMATION','valor_USA_GDP_PERCAPITA','valor_USA_GDP_PERCAPITA_PPP','valor_USA_GDP_FROM_AGRICULTURE','valor_USA_GDP_FROM_CONSTRUCTION','valor_USA_GDP_FROM_MANUFACTURING','valor_USA_GDP_FROM_MINING','valor_USA_GDP_FROM_PUBLIC_ADMINISTRATION','valor_USA_GDP_FROM_SERVICES','valor_USA_GDP_FROM_TRANSPORT','valor_USA_GDP_FROM_UTILITIES'];
var data;


crawler = {
	interval: 100,
	getSample: 'https://www.tradingeconomics.com/united-states/gdp/forecast',
	get: 'https://www.tradingeconomics.com/united-states/gdp/forecast',
	preview: 0,
	extractors: [
		{
		selector: '#aspnetForm div.container div.row div.col-lg-8.col-md-9 div:nth-child(11) div table',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_USA_GROWTH_RATE = html.children('tr').eq(0).children('td').eq(1).text();
			data.valor_USA_ANUAL_GROWTH = html.children('tr').eq(1).children('td').eq(1).text();
			data.valor_USA_GDP = html.children('tr').eq(2).children('td').eq(1).text();
			data.valor_USA_GDP_CONSTANT_PRICES = html.children('tr').eq(3).children('td').eq(1).text();
			data.valor_USA_GROSS_NATIONAL_PRODUCT = html.children('tr').eq(4).children('td').eq(1).text();
			data.valor_USA_GROSS_FIXED_CAPITAL_FORMATION = html.children('tr').eq(5).children('td').eq(1).text();
			data.valor_USA_GDP_PERCAPITA = html.children('tr').eq(6).children('td').eq(1).text();
			data.valor_USA_GDP_PERCAPITA_PPP = html.children('tr').eq(7).children('td').eq(1).text();
			data.valor_USA_GDP_FROM_AGRICULTURE = html.children('tr').eq(8).children('td').eq(1).text();
			data.valor_USA_GDP_FROM_CONSTRUCTION = html.children('tr').eq(9).children('td').eq(1).text();
			data.valor_USA_GDP_FROM_MANUFACTURING = html.children('tr').eq(10).children('td').eq(1).text();
			data.valor_USA_GDP_FROM_MINING = html.children('tr').eq(11).children('td').eq(1).text();
			data.valor_USA_GDP_FROM_PUBLIC_ADMINISTRATION = html.children('tr').eq(12).children('td').eq(1).text();
			data.valor_USA_GDP_FROM_SERVICES = html.children('tr').eq(13).children('td').eq(1).text();
			data.valor_USA_GDP_FROM_TRANSPORT = html.children('tr').eq(14).children('td').eq(1).text();
			data.valor_USA_GDP_FROM_UTILITIES = html.children('tr').eq(15).children('td').eq(1).text();
			console.log("USA_GROWTH_RATE= "+data.valor_USA_GROWTH_RATE+" | "+data.valor_USA_ANUAL_GROWTH  + " | "+ data.valor_USA_GDP);

			gravarCSV(data);
			}
		}
	]

}

function gravarCSV (data) {
      if (data.valor_USA_GROWTH_RATE && data.valor_USA_ANUAL_GROWTH && data.valor_USA_GDP ) {
          csv = '"'+ fields[0] + '"';
          csv+= ',';
          csv+= '"'+ fields[1]+ '"';
          csv+= ',';
          csv+= '"'+ fields[2]+ '"';
          csv+= '\n';
          csv+= '"'+ data.valor_USA_GROWTH_RATE + '"';
          csv+= ',';
          csv+= '"'+ data.valor_USA_ANUAL_GROWTH + '"';
          csv+= ',';
          csv+= '"'+ data.valor_USA_GDP + '"';
          csv+= '\n';
          fs.writeFile('../../../csv/all/brasil-pib.csv', csv, function(err){ if (err) throw err; });
		  console.log("USA_GROWTH_RATE= "+data.valor_USA_GROWTH_RATE+" | "+data.valor_USA_ANUAL_GROWTH  + " | "+ data.valor_USA_GDP);
      }
}
crawlerjs(crawler);

