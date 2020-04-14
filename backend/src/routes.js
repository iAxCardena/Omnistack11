//armazena rotas de acesso da aplicacao
const express = require('express');
const OngController = require('./Controllers/OngController');
const IncidentController = require('./Controllers/IncidentController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController');
const { celebrate, Segments, Joi } = require('celebrate');

//const connection = require('./database/connection');    //importa as configuracoes para realizar operacoes com o banco de dados

const routes = express.Router();

//Request guarda todos os dados que vem atravez da requisicao do usuario;
//Response retorna uma resposta pro usuario

//Rotas que cadastram as ONGs e retornam as ONGs cadastradas (respectivamente)
routes.post('/ongs', celebrate({    //CELEBRATE realiza uma validacao de dados antes de criar
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);   //cria a rota para acesso
routes.get('/ongs', OngController.index);

//Rota para listar todos os incidentes de uma ong
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

//Rotas que criam, listam e deletam os incidentes (respectivamente)
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}),IncidentController.index);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}),IncidentController.delete);

//Rota que realiza o login
routes.post('/sessions', SessionController.create);

module.exports = routes; //exporta a variavel desse arquivo