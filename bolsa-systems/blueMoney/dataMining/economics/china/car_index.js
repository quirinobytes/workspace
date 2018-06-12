#!/usr/bin/env node
var crawlerjs = require('crawler-js');
var fs = require('fs');
var fields = ['valor_TOTAL_VEHICLE_SALES','valor_CAR_PRODUCTION','valor_CAR_REGISTRATIONS'];
var data;


crawler = {
	interval: 100,
	getSample: 'https://www.tradingeconomics.com/china/car-registrations',
	get: 'https://www.tradingeconomics.com/china/car-registrations',
	preview: 0,
	extractors: [
		{
		selector: '#aspnetForm div.container div.row div.col-lg-8.col-md-9 div:nth-child(9) div table',
		callback: function (err,html,url,response) {
			data = {};
			data.valor_TOTAL_VEHICLE_SALES = html.children('tr').eq(9).children('td').eq(1).text();
			data.valor_CAR_PRODUCTION = html.children('tr').eq(10).children('td').eq(1).text();
			data.valor_CAR_REGISTRATIONS = html.children('tr').eq(11).children('td').eq(1).text();
			gravarCSV(data);
		  	console.log("TOTAL_VEHICLE_SALES= "+data.valor_TOTAL_VEHICLE_SALES +" | "+ data.valor_CAR_PRODUCTION + " | "+ data.valor_CAR_REGISTRATIONS);
			}
		}
	]

}

function gravarCSV (data) {
      if (data.valor_TOTAL_VEHICLE_SALES && data.valor_CAR_PRODUCTION && data.valor_CAR_REGISTRATIONS) {
          csv = '"'+ fields[0] + '"';
          csv+= ',';
          csv+= '"'+ fields[1]+ '"';
          csv+= ',';
          csv+= '"'+ fields[2]+ '"';
          csv+= '\n';
          csv+= '"'+ data.valor_TOTAL_VEHICLE_SALES  + '"';
          csv+= ',';
          csv+= '"'+ data.valor_CAR_PRODUCTION + '"';
          csv+= ',';
          csv+= '"'+ data.valor_CAR_REGISTRATIONS + '"';
          csv+= '\n';
          fs.writeFile('../../../csv/all/economics-china-car_index.csv', csv, function(err){ if (err) throw err; });
		  console.log("TOTAL_VEHICLE_SALES= "+data.valor_TOTAL_VEHICLE_SALES +" | "+ data.valor_CAR_PRODUCTION + " | "+ data.valor_CAR_REGISTRATIONS);
      }
}

crawlerjs(crawler);

