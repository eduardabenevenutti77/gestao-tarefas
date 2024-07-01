const { describe, expect, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../../src/server');
const bcrypt = require('bcrypt');
const { sequelize } = require('../../src/models/user'); 

describe('Teste de Integração - User', () => {
    let transaction;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); 
    });

    beforeEach(async () => {
        transaction = await sequelize.transaction();
    });

    afterEach(async () => {
        await transaction.rollback();
    });

    it('POST /api/v1/user - Teste de rota de criação do usuário', async () => {
        const name = 'Maria Eduarda Benevenutti';
        const email = 'eduardabenevenutti77@gmail.com';
        const password = '@Abacate123';
        const mock_user = { name, email, password };

        const response = await request(app).post('/api/v1/user/').send(mock_user).set('transaction', transaction);
        
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toEqual(mock_user.name);
        expect(response.body.email).toEqual(mock_user.email);
        const validate_password = await bcrypt.compare(password, response.body.password);
        expect(validate_password).toBe(true);
    });

    it('PUT /api/v1/user/:id - Teste de rota de alterar do usuário', async () => {
        const name = 'Maria Eduarda Benevenutti';
        const email = 'eduardabenevenutti77@gmail.com';
        const password = '@Abacate123';
        const mock_user = { name, email, password };

        const new_user = await request(app).post('/api/v1/user/').send(mock_user).set('transaction', transaction);
        const userId = new_user.body.id;

        const update_user = {
            id: userId,
            name: 'Maria Eduarda Bischof Benevenutti', 
            email: 'mariaeduardabenevenutti77@gmail.com'
        };
        const response = await request(app).put(`/api/v1/user/${update_user.id}`).send(update_user).set('transaction', transaction);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toEqual(update_user.id);
        expect(response.body.name).toEqual(update_user.name);
        expect(response.body.email).toEqual(update_user.email);
    });

    it('DELETE /api/v1/user/:id - Teste de rota de deletar usuário', async () => {
        const name = 'Maria Eduarda Benevenutti';
        const email = 'eduardabenevenutti77@gmail.com';
        const password = '@Abacate123';

        const mock_user = { name, email, password };
        const new_user = await request(app).post('/api/v1/user/').send(mock_user).set('transaction', transaction);

        const userId = new_user.body.id;
        const response = await request(app).delete(`/api/v1/user/${userId}`).set('transaction', transaction);
        expect(response.statusCode).toBe(204);
    });

    it('GET /api/v1/user/ - Teste de rota de mostrar usuários', async () => {
        const name = 'Maria Eduarda Benevenutti';
        const email = 'eduardabenevenutti77@gmail.com';
        const password = '@Abacate123';
        const mock_user = { name, email, password };

        await request(app) .post('/api/v1/user/').send(mock_user).set('transaction', transaction);
        const response = await request(app).get('/api/v1/user/').set('transaction', transaction);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        const data_user = response.body[0];
        expect(data_user).toHaveProperty('name');
        expect(data_user).toHaveProperty('email');
        expect(data_user).toHaveProperty('password');
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
