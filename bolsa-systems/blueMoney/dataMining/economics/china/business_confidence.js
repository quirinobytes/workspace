#!/usr/bin/env node
var crawlerjs = require('crawler-js');
var fs = require('fs');
var fields = ['valor_BUSINESS_CONFIDENCE','valor_MANUFACTURING_PMI','valor_NON_MANUFACTURING_PMI','valor_SERVICES_PMI','valor_INDUSTRIAL_PRODUCTION','valor_INDUSTRIAL_PRODUCTION_MOM','valor_MANUFACTURING_PRODUCTION','valor_NEW_ORDERS','valor_CHANGE_IN_INVENTORIES','valor_TOTAL_VEHICLE_SALES','valor_CAR_PRODUCTION','valor_CAR_REGISTRATIONS','valor_LEADING_ECONOMIC_INDEX','valor_MNI_BUSINESS_SENTIMENT','valor_STELL_PRODUCTION','valor_COMPETITIVENESS_INDEX','valor_COMPETITIVENESS_RANK','valor_CEMENT_PRODUCTION','valor_EASE_OF_DOING_BUSINESS','valor_ELECTRICITY_PRODUCTION','valor_CORRUPTION_INDEX','valor_CORRUPTION_RANK','valor_CORPORATE_PROFITS'];
var data;


crawler = {
	interval: 100,
	getSample: 'http://www.tradingeconomics.com/china/business-confidence/forecast',
	get: 'http://www.tradingeconomics.com/china/business-confidence/forecast',
	preview: 0,
	extractors: [
				 {
				 selector: '#aspnetForm div.container div.row div.col-lg-8.col-md-9 div:nth-child(11) div table',
				 callback: function (err,html,url,response) {
					 data = {};
					 data.valor_BUSINESS_CONFIDENCE = html.children('tr').eq(0).children('td').eq(1).text();
					 data.valor_MANUFACTURING_PMI  = html.children('tr').eq(1).children('td').eq(1).text();
					 data.valor_NON_MANUFACTURING_PMI = html.children('tr').eq(2).children('td').eq(1).text();
					 data.valor_SERVICES_PMI = html.children('tr').eq(3).children('td').eq(1).text();
					 data.valor_INDUSTRIAL_PRODUCTION = html.children('tr').eq(4).children('td').eq(1).text();
					 data.valor_INDUSTRIAL_PRODUCTION_MOM = html.children('tr').eq(5).children('td').eq(1).text();
					 data.valor_MANUFACTURING_PRODUCTION = html.children('tr').eq(6).children('td').eq(1).text();
					 data.valor_NEW_ORDERS = html.children('tr').eq(7).children('td').eq(1).text();
					 data.valor_CHANGE_IN_INVENTORIES = html.children('tr').eq(8).children('td').eq(1).text();
					 data.valor_TOTAL_VEHICLE_SALES = html.children('tr').eq(9).children('td').eq(1).text();
					 data.valor_CAR_PRODUCTION = html.children('tr').eq(10).children('td').eq(1).text();
					 data.valor_CAR_REGISTRATIONS = html.children('tr').eq(11).children('td').eq(1).text();
					 data.valor_LEADING_ECONOMIC_INDEX = html.children('tr').eq(12).children('td').eq(1).text();
					 data.valor_MNI_BUSINESS_SENTIMENT = html.children('tr').eq(13).children('td').eq(1).text();
					 data.valor_STELL_PRODUCTION = html.children('tr').eq(14).children('td').eq(1).text();
					 data.valor_COMPETITIVENESS_INDEX = html.children('tr').eq(15).children('td').eq(1).text();
					 data.valor_COMPETITIVENESS_RANK = html.children('tr').eq(16).children('td').eq(1).text();
					 data.valor_CEMENT_PRODUCTION = html.children('tr').eq(17).children('td').eq(1).text();
					 data.valor_EASE_OF_DOING_BUSINESS = html.children('tr').eq(18).children('td').eq(1).text();
					 data.valor_ELECTRICITY_PRODUCTION = html.children('tr').eq(19).children('td').eq(1).text();
					 data.valor_CORRUPTION_INDEX = html.children('tr').eq(20).children('td').eq(1).text();
					 data.valor_CORRUPTION_RANK = html.children('tr').eq(21).children('td').eq(1).text();
					 data.valor_CORPORATE_PROFITS = html.children('tr').eq(22).children('td').eq(1).text();
		  			 console.log("CHINA_BUSINESS_CONFIDENCE= "+data.valor_BUSINESS_CONFIDENCE +" | "+ data.valor_CAR_PRODUCTION + " | "+data.valor_STELL_PRODUCTION );
					 gravarCSV(data);
					}
				 }
				]
}

function gravarCSV (data) {
      if (data.valor_BUSINESS_CONFIDENCE && data.valor_CAR_PRODUCTION && data.valor_STELL_PRODUCTION) {
          csv = '"'+ fields[0] + '"';
          csv+= ',';
          csv+= '"'+ fields[10]+ '"';
          csv+= ',';
          csv+= '"'+ fields[14]+ '"';
          csv+= '\n';
          csv+= '"'+ data.valor_BUSINESS_CONFIDENCE + '"';
          csv+= ',';
          csv+= '"'+ data.valor_CAR_PRODUCTION + '"';
          csv+= ',';
          csv+= '"'+ data.valor_STELL_PRODUCTION + '"';
          csv+= '\n';
          fs.writeFile('../../../csv/all/economics-china-business_confidence.csv', csv, function(err){ if (err) throw err; });
		  console.log("CHINA_BUSINESS_CONFIDENCE= "+data.valor_BUSINESS_CONFIDENCE +" | "+ data.valor_CAR_PRODUCTION + " | "+data.valor_STELL_PRODUCTION );
      }
}

crawlerjs(crawler);

