const request = require('supertest');
const app = require('../../src/server'); 
const bcrypt = require('bcrypt');

describe('Teste de API - User', () => {
    let id; 
    beforeAll(async () => {
        id = 1;
    });
    it('Post /api/v1/user - Teste de rota de criação do usuário', async () => {
        const name = 'Maria Eduarda Benevenutti';
        const email = 'eduardabenevenutti77@gmail.com';
        const password = '@Abacate123';
        const user = { name, email, password };
        const response = await request(app).post('/api/v1/user/').send(user);
        console.log(response.body);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toEqual(user.name);
        expect(response.body.email).toEqual(user.email);
        const validate_password = await bcrypt.compare(password, response.body.password);
        expect(validate_password).toBe(true);
    });

    it('Put /api/v1/user/:id - Teste de rota de alterar do usuário', async () => {
        const update_user = {
            id: 1,
            name: 'Maria Eduarda Bischof Benevenutti', // Nome atualizado com teste
            email: 'mariaeduardabenevenutti77@gmail.com'
        }
        try {
            const response = await request(app).put(`/api/v1/user/${update_user.id}`).send(update_user);
            console.log('Dados enviados no response:', response.body); 
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(update_user.id);
            expect(response.body.name).toEqual(update_user.name); 
            expect(response.body.email).toEqual(update_user.email);
        } catch (error) {
            console.error('Error:', error); 
            throw error; 
        }
    });    

    it('Delete /api/v1/user/:id - Teste de rota de deletar usuário', async () => {
        const delete_user = {
            id: 4
        }
        try {
            const response = await request(app).delete(`/api/v1/user/${delete_user.id}`);
            console.log('Dados enviados no response: ', response.body);
            expect(response.statusCode).toBe(204);
        } catch (error) {
            console.error('Error:', error); 
            throw error; 
        }
    });   
    
    it('Get /api/v1/user/ - Teste de rota de mostrar usuários', async () => {
        try {
            const response = await request(app).get('/api/v1/user/');
            console.log('Dados enviados no response: ', response.body);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
            const user = response.body[0];
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('password'); 
        } catch (error) {
            console.error('Error:', error); 
            throw error; 
        }
    });    
});