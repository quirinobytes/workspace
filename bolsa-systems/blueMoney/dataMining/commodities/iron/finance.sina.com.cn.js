var request = require('request');
var fs = require('fs');
var json2csv = require('json2csv');

fields = ['valor_IRON_SINA_CN','maximo_IRON_SINA_CN','minimo_IRON_SINA_CN','media_SINA_CN'];


var url = 'http://hq.sinajs.cn/&list=I0';



request({uri:url},function(error, response, body){

array = body.split(',');
data = {};
data.valor_IRON_SINA_CN = array[7];
data.maximo_SINA_CN = array[3];
data.minimo_SINA_CN = array[4];
data.media_SINA_CN = array[2];

console.log(JSON.stringify(data));


		var csv = json2csv({ data: JSON.stringify(data), fields: fields });
		fs.writeFile('/root/workspace/bolsa-systems/blueMoney/csv/all/finance.sina.cn.com.csv', csv, function(err) {
		if (err) throw err;
			console.log('file saved');
		});


//console.log(array);
});
