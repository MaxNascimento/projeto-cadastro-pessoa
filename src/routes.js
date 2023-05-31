const express = require('express');
const routes = express.Router();

const PessoaController = require('./controllers/PessoaController');

//Rota Pessoa
routes.post('/pessoa', PessoaController.create);
routes.get('/pessoa', PessoaController.read);
routes.patch('/pessoa/:id', PessoaController.update);
routes.delete('/pessoa/:id',PessoaController.delete);


module.exports = routes;
