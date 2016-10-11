// MODULO DE CONFIGURACAO DO BANCO DE DADOS.
//

var mongoose = require('mongoose');
var strDBConnect = 'mongodb://192.168.200.128/CarrosOLX';




mongoose.connect(strDBConnect, function (err,res ){
 if (err)
	 console.log('Não foi possivel conectar a: '+ strDBConnect);
  else
 	console.log('Conectado a: '+ strDBConnect);
});


