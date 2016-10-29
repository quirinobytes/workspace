#!/usr/bin/env node
var colors = require('colors');
var app = require('./config/app_config');
var db = require('./config/db_config.js');
var product = require('./models/product');
var productController = require('./controllers/productController');
var os = require("os");
var saldo=1500;

console.log("\n\n ### Bolsa Systems - Cognitive Information Model v.0.37 ### \n\n\n");

console.log("Lista de saldo dos cliente\nid:cli1900\tvalor: R$ "+saldo+",00 \nid:cli2370\tvalor: R$  950,00\n\n ");

ativos = {}


ativos[1] = {'cod':'VALE5', 'valor':'10,00'};
ativos[2] = {'cod':"USIM5", 'valor':'4,00'};
ativos[3] = {'cod':"CSNA3", 'valor':'11,00'};
ativos[4] = {'cod':"PETR4", 'valor':'18,00'};
ativos[5] = {'cod':"GOLL4", 'valor':'7,00'};
ativos[6] = {'cod':"GGBR4", 'valor':'11,00'};
ativos[7] = {'cod':"GOUA4", 'valor':'5,00'};




app.get ('/',function (req,res) {
	res.write('<html>');
	res.write('RingBank @ Gateway Pagamento - v1.0.0');
	res.write('<br> Servidor: '+os.hostname());
	res.end('</html>');
});

app.get ('/' ,function (req,res) {
	productController.list(function(resp){
		res.json(resp);
	});
	console.log ("IP: " + req.connection.remoteAddress);
});


app.post ('/confirmarpagamento', function (req,res) {
	var id_wearable  = req.body.id_wearable;
        var temperatura = req.body.temperatura;
	var token = req.body.token;
	var codigocliente = req.body.codigocliente;
	var valor = req.body.valor;
	var id_credenciado = req.body.id_credenciado;

	console.log ("IP: " + req.connection.remoteAddress);

	//productController.save(nome,tamanho,cor,valor,function(resp){
	//	res.json(resp);
	console.log("id_wearable= "+id_wearable);
	console.log("id_credenciado= "+id_credenciado);
	console.log("temperatura= "+temperatura);
	console.log("token= "+token);
	console.log("codigocliente= "+codigocliente);
	console.log("ativos[1]= "+ativos[1].cod+" \t = "+ativos[1].valor);
	console.log("ativos[1]= "+ativos[2].cod+" \t = "+ativos[2].valor);
	console.log("ativos[1]= "+ativos[3].cod+" \t = "+ativos[3].valor);
	console.log("ativos[1]= "+ativos[4].cod+" \t = "+ativos[4].valor);
	console.log("ativos[1]= "+ativos[5].cod+" \t = "+ativos[5].valor);
	console.log("ativos[1]= "+ativos[6].cod+" \t = "+ativos[6].valor);
	console.log("ativos[1]= "+ativos[7].cod+" \t = "+ativos[7].valor);


	var id_wearable_checked=false;
	var id_credenciado_checked=false;
	var temperatura_checked=false;
	var token_checked=false;
	var codigocliente_checked=false;



	if ( id_wearable == '00:01')
		id_wearable_checked=true;
	if (temperatura > 25 )
		temperatura_checked = true;
	if (token == '8797RFDE344DS') 
		token_checked = true;
	if (codigocliente == 'cli1900')
		codigocliente_checked = true;
	if (id_credenciado = 'X211435')
		id_credenciado_checked = true;
 
	if (id_wearable_checked == true && temperatura_checked == true && token_checked == true && codigocliente_checked == true && id_credenciado_checked == true) {
		
		if ( valor - saldo <= 0){
			saldo = saldo - valor;
			console.log(('\nCompra efetuada='+valor+'\n').red);
			res.json({pagamento:1});
			console.log("Carteira (cli1900) => "+saldo);
		}
		else
			console.log("Cliente POBRE sem saldo, kkkkk!" );
			res.end("Sem chance. Venda não efetuada!")
	}
	else{
		res.json({pagamento:0});
	}

	//});

});


app.post ('/depositar/:codigocliente/:valor', function(req,res){
	var codigocliente = req.params.codigocliente;
	var valor = req.params.valor;

	console.log(("Recarga cliente: "+codigocliente).yellow);
	console.log(("\nRecarga: "+valor).green);

	if (codigocliente == 'cli1900'){
		saldo = saldo + parseInt(valor);
		console.log((('Deposito ciente (cli1900) => ').yellow+saldo).blue);
		res.json({Deposito:'sucesso'});
	}


});

