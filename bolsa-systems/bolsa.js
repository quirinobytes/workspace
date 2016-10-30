#!/usr/bin/env node
var colors = require('colors');
var app = require('./config/app_config');
var db = require('./config/db_config.js');
var product = require('./models/product');
var productController = require('./controllers/productController');
var os = require("os");
var saldo=1500;

var debug=false;
var start = new Date();
var total = 0.0;

console.log("\n\n ###   ".yellow + "ibSYM - Bolsa Cognitive ".green + "®".red + " Stock Financial S/A".white+  "   Versão: 1.2".cyan  + "   ### \n\n\n".yellow);

console.log("Lista de saldo dos cliente\nid:cli1900\tvalor: R$ "+saldo+",00 \nid:cli2370\tvalor: R$  950,00\n\n ");

ativos = {};
abertura = {};
max=[];
min=[];
volume=[];

ativos['VALE5'] = {'nome':'VALE5', 'valor':21};
ativos['USIM5'] = {'nome':"USIM5", 'valor':4.60};
ativos['CSNA3'] = {'nome':"CSNA3", 'valor':10};
ativos['PETR4'] = {'nome':"PETR4", 'valor':18};
ativos['GOLL4'] = {'nome':"GOLL4", 'valor':8};
ativos['GGBR4'] = {'nome':"GGBR4", 'valor':11};
ativos['GOAU4'] = {'nome':"GOAU4", 'valor':4.80};
abertura['VALE5'] = {'nome':'VALE5', 'valor':21};
abertura['USIM5'] = {'nome':"USIM5", 'valor':4.60};
abertura['CSNA3'] = {'nome':"CSNA3", 'valor':10};
abertura['PETR4'] = {'nome':"PETR4", 'valor':18};
abertura['GOLL4'] = {'nome':"GOLL4", 'valor':8};
abertura['GGBR4'] = {'nome':"GGBR4", 'valor':11};
abertura['GOAU4'] = {'nome':"GOAU4", 'valor':4.80};
min['VALE5']= 99999;
max['VALE5']= 0;
min['USIM5']= 99999;
max['USIM5']= 0;
min['CSNA3']= 99999;
max['CSNA3']= 0;
min['PETR4']= 99999;
max['PETR4']= 0;
min['GOLL4']= 99999;
max['GOLL4']= 0;
min['GGBR4']= 99999;
max['GGBR4']= 0;
min['GOAU4']= 99999;
max['GOAU4']= 0;
volume['VALE5']=0;
volume['USIM5']=0;
volume['PETR4']=0;
volume['CSNA3']=0;
volume['GOLL4']=0;
volume['GGBR4']=0;
volume['GOAU4']=0;





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

app.get ('/listar',function(req,res){
	var cliente = JSON.stringify({
		ativo : ativos['VALE5'].nome ,
		valor : ativos['VALE5'].valor,
	});
	//localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
	res.json(cliente);
});

app.post ('/comprar', function (req,res) {
	var id_corretora  = req.body.id_corretora;
	var id_cliente = req.body.id_cliente;
        var ativo = req.body.ativo;
	var quantidade = req.body.quantidade;
	var valor = parseFloat(req.body.valor);
	var token = req.body.token;
	var tipo = "Compra";

if (debug)
	console.log ("IP: " + req.connection.remoteAddress);

	//productController.save(nome,tamanho,cor,valor,function(resp){
	//	res.json(resp);
if (debug){
	console.log("id_corretora= "+id_corretora);
	console.log("id_cliente= "+id_cliente);
	console.log("ativo= "+ativo);
	console.log("quantidade= "+quantidade);
	console.log("valor= "+valor);
	console.log("token= "+token);
	console.log("tipo= "+tipo);
}


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
		 if (debug) console.log("ativos[ativo].valor="+ativos[ativo].valor);
			ativos[ativo].valor = ativos[ativo].valor + ((valor - ativos[ativo].valor)*quantidade/1000000) ;
			//aqui a COMPRA esta efetuada. 
			//vamos pegar o max lançe.
			if (valor > max[ativo]) max[ativo] = valor.toFixed(2);
			//vamos pegar o volume
			volume[ativo]=volume[ativo]+quantidade*valor;

			if (debug) console.log(('\nCompra:  '+ quantidade +' => '+ ativos[ativo].nome + '\n').green);
			res.json({'Compra':true,'valor':ativos[ativo].valor,'quantidade':quantidade,'ativo':ativo});
			if (debug) console.log("ACAO => "+ ativos[ativo].nome + " => " + ativos[ativo].valor);
		}
		else{
			if (debug) console.log("Cliente POBRE, abaixo do valor de mercado !" );
			//res.end("COMPRA não efetuada!\n Valor Atua: "+ativos[ativo].valor)
			res.json({'Compra':false,'valor':ativos[ativo].valor,'quantidade':quantidade,'ativo':ativo});
		}
	}
	else{
		res.json({'Compra':false,'valor':ativos[ativo].valor});
	}

	mostra_painel();

});

app.post ('/vender',function(req,res){

	var id_corretora  = req.body.id_corretora;
	var id_cliente = req.body.id_cliente;
    var ativo = req.body.ativo;
	var quantidade = req.body.quantidade;
	var valor = parseFloat(req.body.valor);
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
			//aqui a VENDA esta efetuada.
			//pegar o minino lançe.
			if (valor < min[ativo]) min[ativo] = valor.toFixed(2);
			//vamos pegar o volume
			volume[ativo]=volume[ativo]+quantidade*valor;

			if (debug)	 console.log("ativos[ativo].valor="+ativos[ativo].valor);
			ativos[ativo].valor = ativos[ativo].valor + ((valor - ativos[ativo].valor)*quantidade/1000000) ;

		if (debug)	console.log(('\nVenda:  '+ quantidade +' => '+ ativos[ativo].nome + '\n').red);
			res.json({'Venda':true,'valor':ativos[ativo].valor,'quantidade':quantidade,'ativo':ativo});
		if (debug)	console.log("ACAO => "+ ativos[ativo].nome + " => " + ativos[ativo].valor);
		}
		else
		 if(debug)	console.log("Ordem Acima do valor de mercado, vc tem que vender por menos que o valor dela, kkkkk!" );
		//	res.end("Valor muito alto. Venda não efetuada!")
	}
	else{
			res.json({'Venda':false,'valor':ativos[ativo].valor});

	}

mostra_painel();

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


	console.log("\n\n###   Mesa de Operações    ###\n".yellow); 
	porcentagem = [];
	porcentagem['VALE5'] = ( 100 * ativos['VALE5'].valor / abertura['VALE5' ].valor  ) - 100;
		if (porcentagem['VALE5'] > 0 )
			porcentagem['VALE5'] = porcentagem['VALE5'].toFixed(2).green;
		if (porcentagem['VALE5'] < 0 )
			porcentagem['VALE5'] = porcentagem['VALE5'].toFixed(2).red;

	porcentagem['USIM5'] = (100 * ativos['USIM5'].valor / abertura['USIM5' ].valor ) - 100;
		if (porcentagem['USIM5'] > 0 )
			porcentagem['USIM5'] = porcentagem['USIM5'].toFixed(2).green;
		if (porcentagem['USIM5'] < 0 )
			porcentagem['USIM5'] = porcentagem['USIM5'].toFixed(2).red;

	porcentagem['CSNA3'] = (100 * ativos['CSNA3'].valor / abertura['CSNA3' ].valor) - 100  ;
		if (porcentagem['CSNA3'] > 0 )
			porcentagem['CSNA3'] = porcentagem['CSNA3'].toFixed(2).green;
		if (porcentagem['CSNA3'] < 0 )
			porcentagem['CSNA3'] = porcentagem['CSNA3'].toFixed(2).red;


	porcentagem['PETR4'] = (100 * ativos['PETR4'].valor / abertura['PETR4' ].valor) - 100;
		if (porcentagem['PETR4'] > 0 )
			porcentagem['PETR4'] = porcentagem['PETR4'].toFixed(2).green;
		if (porcentagem['PETR4'] < 0 )
			porcentagem['PETR4'] = porcentagem['PETR4'].toFixed(2).red;


	porcentagem['GOLL4'] = (100 * ativos['GOLL4'].valor / abertura['GOLL4' ].valor) - 100 ;
		if (porcentagem['GOLL4'] > 0 )
			porcentagem['GOLL4'] = porcentagem['GOLL4'].toFixed(2).green;
		if (porcentagem['GOLL4'] < 0 )
			porcentagem['GOLL4'] = porcentagem['GOLL4'].toFixed(2).red;


	porcentagem['GGBR4'] = (100 * ativos['GGBR4'].valor / abertura['GGBR4' ].valor) - 100 ;
		if (porcentagem['GGBR4'] > 0 )
			porcentagem['GGBR4'] = porcentagem['GGBR4'].toFixed(2).green;
		if (porcentagem['GGBR4'] < 0 )
			porcentagem['GGBR4'] = porcentagem['GGBR4'].toFixed(2).red;


	porcentagem['GOAU4'] = (100 * ativos['GOAU4'].valor / abertura['GOAU4' ].valor) - 100 ;
			if (porcentagem['GOAU4'] > 0 )
			porcentagem['GOAU4'] = porcentagem['GOAU4'].toFixed(2).green;
		if (porcentagem['GOAU4'] < 0 )
			porcentagem['GOAU4'] = porcentagem['GOAU4'].toFixed(2).red;


	total = (volume['VALE5'] + volume['CSNA3'] + volume['PETR4'] + volume['USIM5'] + volume['GOAU4'] + volume['GGBR4'] + volume['GOLL4'])/1000000 ;
	total = total.toFixed(2);
	str_total = total.toString().green;

	//limpar a tela
	console.log ("\033[2J");
	//voltar la no começo da tela
	console.log ("\033[0;0f");
	tempo = (new Date() - start)/1000;
	console.log("\t\t###   Mesa de Operações    ###\t tempo:".yellow + tempo.toFixed(0)+ "s Total: "+str_total+"M"); 
	console.log("\t\t      =================       ".yellow); 

	console.log("  ATIVO   |   VALOR     |    VAR %      | ABERT |  MIN\t| MAX\t|    VOLUME");
	console.log("==========|=============|===============|=======|=======|=======|==============");
	console.log("  "+ ativos['VALE5'].nome+"   |   "+ativos['VALE5'].valor.toFixed(2)+ "\t|     " + porcentagem['VALE5']+ "%\t|  "+ abertura['VALE5'].valor + "\t| " + min['VALE5']+"\t| " + max['VALE5'] + "\t|  " + (volume['VALE5']/1000).toFixed(2)+"K");
	console.log("  "+ ativos['USIM5'].nome+"   |   "+ativos['USIM5'].valor.toFixed(2)+ "\t|     " + porcentagem['USIM5']+ "%\t|  "+ abertura['USIM5'].valor + "\t| " + min['USIM5']+"\t| " + max['USIM5'] + "\t|  " + (volume['USIM5']/1000).toFixed(2)+"K");
	console.log("  "+ ativos['CSNA3'].nome+"   |   "+ativos['CSNA3'].valor.toFixed(2)+ "\t|     " + porcentagem['CSNA3']+ "%\t|  "+ abertura['CSNA3'].valor + "\t| " + min['CSNA3']+"\t| " + max['CSNA3'] + "\t|  " + (volume['CSNA3']/1000).toFixed(2)+"K");
	console.log("  "+ ativos['PETR4'].nome+"   |   "+ativos['PETR4'].valor.toFixed(2)+ "\t|     " + porcentagem['PETR4']+ "%\t|  "+ abertura['PETR4'].valor + "\t| " + min['PETR4']+"\t| " + max['PETR4'] + "\t|  " + (volume['PETR4']/1000).toFixed(2)+"K");
	console.log("  "+ ativos['GOLL4'].nome+"   |   "+ativos['GOLL4'].valor.toFixed(2)+ "\t|     " + porcentagem['GOLL4']+ "%\t|  "+ abertura['GOLL4'].valor + "\t| " + min['GOLL4']+"\t| " + max['GOLL4'] + "\t|  " + (volume['GOLL4']/1000).toFixed(2)+"K");
	console.log("  "+ ativos['GGBR4'].nome+"   |   "+ativos['GGBR4'].valor.toFixed(2)+ "\t|     " + porcentagem['GGBR4']+ "%\t|  "+ abertura['GGBR4'].valor + "\t| " + min['GGBR4']+"\t| " + max['GGBR4'] + "\t|  " + (volume['GGBR4']/1000).toFixed(2)+"K");
	console.log("  "+ ativos['GOAU4'].nome+"   |   "+ativos['GOAU4'].valor.toFixed(2)+ "\t|     " + porcentagem['GOAU4']+ "%\t|  "+ abertura['GOAU4'].valor + "\t| " + min['GOAU4']+"\t| " + max['GOAU4'] + "\t|  " + (volume['GOAU4']/1000).toFixed(2)+"K");





};
