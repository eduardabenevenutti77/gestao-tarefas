const app = require('../../src/app');
const request = require('supertest');

beforeAll(async () => {
    await new Promise(resolve => {
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Servidor Express iniciado para testes na porta ${port}`);
            resolve();
        });
    });
});

describe('Teste de API - User', () => {
    it('Post /api/v1/user/ - Teste de rota de criação do usuário', async () => {
        const response = await request(app)
            .post('/api/v1/user/')
            .send({
                name: 'Maria Eduarda Benevenutti',
                email: 'eduardabenevenutti77@gmail.com',
                password: '@Abacate123'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ result: user });
    });
});
