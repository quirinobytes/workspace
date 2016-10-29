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


ativos['VALE5'] = {'nome':'VALE5', 'valor':10};
ativos['USIM5'] = {'nome':"USIM5", 'valor':4};
ativos['CSNA3'] = {'nome':"CSNA3", 'valor':11};
ativos['PETR4'] = {'nome':"PETR4", 'valor':18};
ativos['GOLL4'] = {'nome':"GOLL4", 'valor':7};
ativos['GGBR4'] = {'nome':"GGBR4", 'valor':11};
ativos['GOAU4'] = {'nome':"GOAU4", 'valor':5};


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


app.post ('/comprar', function (req,res) {
	var id_corretora  = req.body.id_corretora;
	var id_cliente = req.body.id_cliente;
        var ativo = req.body.ativo;
	var quantidade = req.body.quantidade;
	var valor = parseInt(req.body.valor);
	var token = req.body.token;
	var tipo = "Compra";

	console.log ("IP: " + req.connection.remoteAddress);

	//productController.save(nome,tamanho,cor,valor,function(resp){
	//	res.json(resp);
	console.log("id_corretora= "+id_corretora);
	console.log("id_cliente= "+id_cliente);
	console.log("ativo= "+ativo);
	console.log("quantidade= "+quantidade);
	console.log("valor= "+valor);
	console.log("token= "+token);
	console.log("tipo= "+tipo);

mostra_painel();

	var id_corretora_checked=false;
	var id_cliente_checked=false;
	var ativo_checked=false;
	var quantidade_checked=false;
	var token_checked=false;



	if ( id_corretora > 0 && id_corretora < 1000)
		id_corretora_checked=true;
	if (ativo == "VALE5" | ativo == "CSNA3" | ativo == "PETR4" | ativo == "USIM5"| ativo == "GOAU4" | ativo == "GGBR4" | ativo == "GOLL4" )
		ativo_checked = true;
	if (quantidade >= 100 )
		quantidade_checked = true;
	if (token == '1234abcd')
		token_checked = true;
	if (id_cliente > 0 )
		id_cliente_checked = true;

	if (id_corretora_checked == true && ativo_checked == true && quantidade_checked == true && token_checked == true && id_cliente_checked == true) {

		 if ( valor - ativos[ativo].valor > 0){
		 console.log("@@@ ativos[ativo].valor="+ativos[ativo].valor);
			ativos[ativo].valor = ativos[ativo].valor + ((valor - ativos[ativo].valor)*quantidade/1000) ;

			console.log(('\nCompra:  '+ quantidade +' => '+ ativos[ativo].nome + '\n').green);
			res.json({'Compra':true,'valor':ativos[ativo].valor});
			console.log("ACAO => "+ ativos[ativo].nome + " => " + ativos[ativo].valor);
		}
		else
			console.log("Cliente POBRE, abaixo do valor de mercado !" );
			res.end("COMPRA não efetuada!\n Valor Atua: "+ativos[ativo].valor)
	}
	else{
		res.json({'Compra':false,'valor':ativos[ativo].valor});
	}

	//});

});

app.post ('/vender',function(req,res){
	mostra_painel();

	var id_corretora  = req.body.id_corretora;
	var id_cliente = req.body.id_cliente;
        var ativo = req.body.ativo;
	var quantidade = req.body.quantidade;
	var valor = parseInt(req.body.valor);
	var token = req.body.token;
	var tipo = "Venda";
	var id_corretora_checked=false;
	var id_cliente_checked=false;
	var ativo_checked=false;
	var quantidade_checked=false;
	var token_checked=false;

	if ( id_corretora > 0 && id_corretora < 1000)
		id_corretora_checked=true;
	if (ativo == "VALE5" | ativo == "CSNA3" | ativo == "PETR4" | ativo == "USIM5"| ativo == "GOAU4" | ativo == "GGBR4" | ativo == "GOLL4" )
		ativo_checked = true;
	if (quantidade >= 100 )
		quantidade_checked = true;
	if (token == '1234abcd')
		token_checked = true;
	if (id_cliente > 0 )
		id_cliente_checked = true;

	if (id_corretora_checked == true && ativo_checked == true && quantidade_checked == true && token_checked == true && id_cliente_checked == true) {
		 if ( valor - ativos[ativo].valor < 0){
		 console.log("@@@ ativos[ativo].valor="+ativos[ativo].valor);
			ativos[ativo].valor = ativos[ativo].valor + ((valor - ativos[ativo].valor)*quantidade/1000) ;

			console.log(('\nVenda:  '+ quantidade +' => '+ ativos[ativo].nome + '\n').red);
			res.json({'Venda':true,'valor':ativos[ativo].valor});
			console.log("ACAO => "+ ativos[ativo].nome + " => " + ativos[ativo].valor);
		}
		else
			console.log("Ordem Acima do valor de mercado, vc tem que vender por menos que o valor dela, kkkkk!" );
			res.end("Valor muito alto. Venda não efetuada!")
	}
	else{
			res.json({'Venda':false,'valor':ativos[ativo].valor});

	}


});


app.post ('/exibir/:ativo/:token', function(req,res){
	var token = req.params.token;
	var valor = req.params.valor;

	console.log(("Recarga cliente: "+token).yellow);
	console.log(("\nRecarga: "+valor).green);

	if (token == 'cli1900'){
		saldo = saldo + parseInt(valor);
		console.log((('Deposito ciente (cli1900) => ').yellow+saldo).blue);
		res.json({Deposito:'sucesso'});
	}


});

function mostra_painel(){


	console.log("\n\n### \t Posicao das ACOES\t ###\n"); 
	console.log(ativos['VALE5'].nome+" \t = "+ativos['VALE5'].valor);
	console.log(ativos['USIM5'].nome+" \t = "+ativos['USIM5'].valor);
	console.log(ativos['CSNA3'].nome+" \t = "+ativos['CSNA3'].valor);
	console.log(ativos['PETR4'].nome+" \t = "+ativos['PETR4'].valor);
	console.log(ativos['GOLL4'].nome+" \t = "+ativos['GOLL4'].valor);
	console.log(ativos['GGBR4'].nome+" \t = "+ativos['GGBR4'].valor);
	console.log(ativos['GOAU4'].nome+" \t = "+ativos['GOAU4'].valor);


};
