//armazena rotas de acesso da aplicacao
const express = require('express');
const OngController = require('./Controllers/OngController');
const IncidentController = require('./Controllers/IncidentController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController');

//const connection = require('./database/connection');    //importa as configuracoes para realizar operacoes com o banco de dados

const routes = express.Router();

//Request guarda todos os dados que vem atravez da requisicao do usuario;
//Response retorna uma resposta pro usuario

//Rotas que cadastram as ONGs e retornam as ONGs cadastradas (respectivamente)
routes.post('/ongs', OngController.create);   //cria a rota para acesso
routes.get('/ongs', OngController.index);

//Rota para listar todos os incidentes de uma ong
routes.get('/profile', ProfileController.index);

//Rotas que criam, listam e deletam os incidentes (respectivamente)
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

//Rota que realiza o login
routes.post('/sessions', SessionController.create);

module.exports = routes; //exporta a variavel desse arquivo