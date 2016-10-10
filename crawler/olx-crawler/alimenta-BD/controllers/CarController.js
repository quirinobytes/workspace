var Carros = require ('../models/carros');


exports.save = function (carro,ano,valor,callback){
	new Carros({
		'carro': carro,
		'ano': ano,
		'valor': valor
	}).save(function(error, carros){
		if (error){
			callback({error: 'Não foi possível salvar'});
		}else{
		callback(carros);
		}
	});

}

exports.list = function (callback){
	Carros.find({}, function(error, carros) {
		if (error){
			callback ({error: "Não foi possível encontrar os produtos"});
		}else{
			callback(carros);
		}
	});
}

exports.delete = function (id, callback){
	Carros.findById(id, function(error, produto){
		if (error){
			callback({error: "Não foi possivel excluir o produto"});
		}else{
			Carros.remove({_id: id},function(error){
				if(!error){
					callback({resposta: "Produto excluido com sucesso"});
				}
			});
		}
	})
}


