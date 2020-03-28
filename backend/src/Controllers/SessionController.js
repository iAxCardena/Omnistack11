const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        const {id} = request.body;

        const ong = await connection('ongs')    //busca o nome da ong baseado no id
            .where('id', id)
            .select('name')
            .first();
        
        if (!ong){  //verifica se a ong existe
            return response.status(400).json({error: 'No ONG found with this ID.'});
        }

        return response.json(ong);  //retorna os dados da ong (nome)
    }
}