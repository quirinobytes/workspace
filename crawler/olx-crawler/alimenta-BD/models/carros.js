// Esse modulo é responsavel por configurar a tabela no BANCO.
// //
// // MODELAGEM DE DADOS
//
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var CarrosSchema = new Schema({
    carro: String,
    ano: String,
    valor: String
});


module.exports = mongoose.model('CarrosOLX', CarrosSchema);

