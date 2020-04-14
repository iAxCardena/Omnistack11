//Realiza um teste de integracao na funcionalidade de criacao de ONGs
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async() => {
        await connection.migrate.rollback();    //zera o banco de dados para n influenciar nos testes
        await connection.migrate.latest();
    })

    afterAll(async() => {
        await connection.destroy();
    })

    if('sould be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "CEIA",
                email: "contato@ceia.com",
                whatsapp: "999451668",
                city: "Dourados",
                uf: "MS"
            });
        
            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
    });
});