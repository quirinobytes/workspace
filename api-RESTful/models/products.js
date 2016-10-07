// Esse modulo é responsavel por configurar a tabela no BANCO.
//
// MODELAGEM DE DADOS

var mongoose = requite ('mongoose');
var schema = mongoose.Schema;

var ProductSchema = new Schema({
	nome: String,
	tamanho: Integer,
	cor: String,
	valor: Integer,
});



modulo.exports = mongoose.model('Product', ProductSchema);
