const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;   //busca o parametro 'page' (pagina)

        const [count] = await connection('incidents').count(); //realiza a contagem de incidentes cadastrados

        console.log(count);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //relaciona dados das tabelas ongs e incidentes
        .limit(5)               //limita a quantidade de incidentes por pagina
        .offset((page - 1) * 5) //pula 5 registros por pagina para realizar a paginacao
        .select(['incidents.*',
         'ongs.name',
         'ongs.email',
         'ongs.whatsapp',
         'ongs.city',
         'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);    //retorna para o front-end a quantidade de registros para o header da resposta da requisicao

        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;   //Busca o id da ong no header da requisicao a partir da autorizacao da ong (id de cadastro)
        
        const [id] = await connection('incidents').insert({ //eh possivel pegar o id da requisicao dessa maneira pois, como eh feita a irsercao de um unico registro, o resultado (id) sera um array de uma posicao
            title,
            description,
            value,
            ong_id,
        });

        return response.json({id});
    },

    async delete(request, response){
         const {id} = request.params;   //retorna o id do incidente
         const ong_id = request.headers.authorization;  //retorna o id da ong que criou o incidente. Precisa verificar se o incidente foi criado pela mesma ong que quer deletar

         const incident = await connection('incidents') 
            .where('id', id)    //id = id acessado
            .select('ong_id')   //id da ong que criou
            .first();           //pega o primeiro resultado pois cada incidente tem id unico

        if (incident.ong_id != ong_id){     //verifica se o id da ong que esta querendo deletar, eh o mesmo que criou
            return response.status(401).json({ error: 'Operation not permitted.'}); //retorna uma resposta json dizendo que a operacao nao foi autorizada (code 403)
        }

        await connection('incidents').where('id', id).delete(); //deleta do banco

        return response.status(204).send(); //retorna uma resposta com sucesso mas sem conteudo (code 204)
    }
};