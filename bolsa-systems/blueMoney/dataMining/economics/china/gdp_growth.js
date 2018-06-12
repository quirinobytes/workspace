#!/usr/bin/env node
var crawlerjs = require('crawler-js');
var fs = require('fs');
var fields = ['valor_CHINA_GROWTH_RATE','valor_CHINA_ANUAL_GROWTH','valor_CHINA_GDP','valor_CHINA_GDP_CONSTANT_PRICES','valor_CHINA_GROSS_NATIONAL_PRODUCT','valor_CHINA_GROSS_FIXED_CAPITAL_FORMATION','valor_CHINA_GDP_PERCAPITA','valor_CHINA_GDP_PERCAPITA_PPP','valor_CHINA_GDP_FROM_AGRICULTURE','valor_CHINA_GDP_FROM_CONSTRUCTION','valor_CHINA_GDP_FROM_MANUFACTURING','valor_CHINA_GDP_FROM_MINING','valor_CHINA_GDP_FROM_PUBLIC_ADMINISTRATION','valor_CHINA_GDP_FROM_SERVICES','valor_CHINA_GDP_FROM_TRANSPORT','valor_CHINA_GDP_FROM_UTILITIES'];
var data;


crawler = {
	interval: 100,
	getSample: 'http://www.tradingeconomics.com/china/gdp/forecast',
	get: 'http://www.tradingeconomics.com/china/gdp/forecast',
	preview: 0,
	extractors: [
		{
		selector: '#aspnetForm div.container div.row div.col-lg-8.col-md-9 div:nth-child(11) div table',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_CHINA_GROWTH_RATE = html.children('tr').eq(0).children('td').eq(1).text();
			data.valor_CHINA_ANUAL_GROWTH = html.children('tr').eq(1).children('td').eq(1).text();
			data.valor_CHINA_GDP = html.children('tr').eq(2).children('td').eq(1).text();
			data.valor_CHINA_GDP_CONSTANT_PRICES = html.children('tr').eq(3).children('td').eq(1).text();
			data.valor_CHINA_GROSS_NATIONAL_PRODUCT = html.children('tr').eq(4).children('td').eq(1).text();
			data.valor_CHINA_GROSS_FIXED_CAPITAL_FORMATION = html.children('tr').eq(5).children('td').eq(1).text();
			data.valor_CHINA_GDP_PERCAPITA = html.children('tr').eq(6).children('td').eq(1).text();
			data.valor_CHINA_GDP_PERCAPITA_PPP = html.children('tr').eq(7).children('td').eq(1).text();
			data.valor_CHINA_GDP_FROM_AGRICULTURE = html.children('tr').eq(8).children('td').eq(1).text();
			data.valor_CHINA_GDP_FROM_CONSTRUCTION = html.children('tr').eq(9).children('td').eq(1).text();
			data.valor_CHINA_GDP_FROM_MANUFACTURING = html.children('tr').eq(10).children('td').eq(1).text();
			data.valor_CHINA_GDP_FROM_MINING = html.children('tr').eq(11).children('td').eq(1).text();
			data.valor_CHINA_GDP_FROM_PUBLIC_ADMINISTRATION = html.children('tr').eq(12).children('td').eq(1).text();
			data.valor_CHINA_GDP_FROM_SERVICES = html.children('tr').eq(13).children('td').eq(1).text();
			data.valor_CHINA_GDP_FROM_TRANSPORT = html.children('tr').eq(14).children('td').eq(1).text();
			data.valor_CHINA_GDP_FROM_UTILITIES = html.children('tr').eq(15).children('td').eq(1).text();
			gravarCSV(data);
			}
		}
	]

}

function gravarCSV (data) {
      if (data.valor_CHINA_GROWTH_RATE && data.valor_CHINA_ANUAL_GROWTH && data.valor_CHINA_GDP){
          csv = '"'+ fields[0] + '"';
          csv+= ',';
          csv+= '"'+ fields[1]+ '"';
          csv+= ',';
          csv+= '"'+ fields[2]+ '"';
          csv+= '\n';
          csv+= '"'+ data.valor_CHINA_GROWTH_RATE + '"';
          csv+= ',';
          csv+= '"'+ data.valor_CHINA_ANUAL_GROWTH + '"';
          csv+= ',';
          csv+= '"'+ data.valor_CHINA_GDP + '"';
          csv+= '\n';
          fs.writeFile('../../../csv/all/economics-china-gdp_growth.csv', csv, function(err){ if (err) throw err; });
		  console.log("CHINA= "+data.valor_CHINA_GROWTH_RATE+" | "+ data.valor_CHINA_ANUAL_GROWTH + " | "+ data.valor_CHINA_GDP);
      }
}
crawlerjs(crawler);
