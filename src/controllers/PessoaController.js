const { request, response } = require('express');
const Pessoa = require('../models/PessoaData');

module.exports = {

    async read(request,response){
        const pessoaList = await Pessoa.find();

        return response.json(pessoaList);
    },



    async create(request, response) {
        const { nome, cpf, data} = request.body;

        if(!nome){
            return response.status(400).json({error: "Necessário informar o Nome!"});
        }

        if(!cpf){
            return response.status(400).json({error: "Necessário informar CPF!"});
        }

        if(!data){
            return response.status(400).json({error: "Necessário informar CPF!"});
        }

        
        if (!TestaCPF(cpf)){
           return response.status(400).json({error: "O CPF informado é inválido!"});
        }

        const pessoaCPF = await Pessoa.findOne({ cpf : cpf });
        
        if(pessoaCPF){
            return response.status(400).json({error: "O CPF informado já está cadastrado!"});
        };
        
       
        const pessoaCreated = await Pessoa.create({
            nome,
            cpf,
            data
        });
       

        if (pessoaCreated) {
            response.send ({"status": true, "message":"Cadastrado com sucesso!"})
        }else{
            response.send ({"status": false, "message":"Erro ao cadastrar pessoa!"})
        }
       
    },

    async update(request, response){
        const { id } = request.params;
        const objupdate = request.body;

        if(!objupdate.nome){
            return response.status(400).json({error: "Necessário informar o Nome!"});
        }  

        const pessoaUpdate = await Pessoa.findByIdAndUpdate({ _id : id }, { $set: objupdate});

        
      
        if (pessoaUpdate) {
            response.send ({"status": true, "message":"Alterado com sucesso!"})
        }else{
            response.send ({"status": false, "message":"Erro ao alterar pessoa!"})
        }

    },

    async delete(request, response){
     const { id } = request.params;

     const pessoaDeleted = await Pessoa.findByIdAndDelete({_id : id})

     if (pessoaDeleted) {
       return response.send ({"status": true, "message":"Deletado com sucesso!"})
    }
     return response.status(401).json({error: 'Não foi encontrado registro para deletar!'})


    }

}


function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
	var er = /[.-]/gi;
	strCPF = strCPF.replace(er, "");

  if (strCPF == "00000000000") return false;
  if (strCPF == "11111111111") return false;
  if (strCPF == "22222222222") return false;
  if (strCPF == "33333333333") return false;
  if (strCPF == "44444444444") return false;
  if (strCPF == "55555555555") return false;
  if (strCPF == "66666666666") return false;
  if (strCPF == "77777777777") return false;
  if (strCPF == "88888888888") return false;
  if (strCPF == "99999999999") return false;


  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}




    