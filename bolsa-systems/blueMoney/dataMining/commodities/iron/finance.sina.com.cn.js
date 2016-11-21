var request = require('request');

var url = 'http://hq.sinajs.cn/&list=I0';



request({uri:url},function(error, response, body){

array = body.split(',');
valor = {};
valor.atual = array[7];
valor.max = array[3];
valor.min = array[4];
valor.media = array[2];

console.log(JSON.stringify(valor));

//console.log(array);
});
