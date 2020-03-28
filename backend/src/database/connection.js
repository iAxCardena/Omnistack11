//cria a conexao do banco de dados com a aplicacao
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //passa a conexao de desenvolvimento

module.exports = connection;
