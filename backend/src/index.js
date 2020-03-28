const express = require('express'); //importa o modulo express para a variavel
const routes = require('./routes');
const cors = require('cors');

const app = express(); //essa variavel armazena a aplicacao

app.use(cors());  //CORS determina quem pode acessar a aplicacao
app.use(express.json());    //informa ao express converter requisicoes json em objetos js
app.use(routes);

/**
 * Metodos HTTP
 * 
 * GET: Buscar/listar uma informacao do back-end
 * POST: Criar uma informacao no back-end
 * PUT: Alterar uma informacao no back-end
 * DELETE: Deletar uma informacao no back-end
 */

/**
 * Tipos de parametros:
 * 
 * Query: Parametros nomeados enviados na rota apos '?' (servem como filtros, paginacao)
 *  const params = request.query;

    console.log(params); //retorna no terminal os parametros da requisicao (/users?name='Igor')
    
 * Route: Parametros utilizados para identificar recursos
    const params = request.params;

    console.log(params); //retorna no terminal os parametros da requisicao (/users/1)

 * Request Body: Corpo da requisicao, uitilziado para criar ou alterar recursos
 */

app.listen(3333) //localhost:3333 acessa a aplicacao que esta ouvindo esta porta