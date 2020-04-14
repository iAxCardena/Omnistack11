//cria a conexao do banco de dados com a aplicacao
const knex = require('knex');
const configuration = require('../../knexfile');

//se a configuracao (NODE_ENV = test) for 'test', sera usada a config de testes, senao a de desenvolvimento (config.development) 
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config); //passa a conexao de desenvolvimento

module.exports = connection;
