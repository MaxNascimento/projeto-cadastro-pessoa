const mongoose = require('mongoose');

const PessoaData = mongoose.model('Pessoa',{
    nome: String,
    cpf: String,
    data: Date
});

module.exports = PessoaData;