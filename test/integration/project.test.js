const { describe, expect, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../../src/server');
const sequelize = require('../../src/database');
const Project = require('../../src/models/project');
const User = require('../../src/models/user');

describe('Teste de Integração - Project', () => {
    let transaction;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); 
    });

    beforeEach(async () => {
        transaction = await sequelize.transaction();
        await User.create({ id: 1, name: 'Elisangela Aparecida Bischof Benevenutti' }, { transaction }); 
    });

    afterEach(async () => {
        await transaction.rollback();
    });

    it('Post /api/v1/project/ - Teste de rota de criação do projetos', async () => {
        const mock_project = {
            name: 'Trabalho de gestão de tarefas',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            userID: 1
        };

        const response = await request(app).post('/api/v1/project/').send(mock_project).expect(201);

        expect(response.body.name).toBe(mock_project.name);
        expect(response.body.description).toBe(mock_project.description);
        expect(response.body.date_inclusion).toBe(mock_project.date_inclusion);
        expect(response.body.userID).toBe(mock_project.userID);
    });

    it('Put /api/v1/project/:id - Teste de rota de alterar do projetos', async () => {
        const mock_project = {
            name: 'Trabalho de gestão de tarefas',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            userID: 1
        };

        const new_project = await Project.create(mock_project, { transaction });
        const projectId = new_project.id;

        const update_project = {
            name: 'Trabalho de gestão de tarefas', 
            description: 'Muito díficil de fazer! Vou trancar a faculdade ;3',
            date_inclusion: new Date().toISOString()
        };

        const response = await request(app).put(`/api/v1/project/${projectId}`).send(update_project).expect(200);

        expect(response.body.id).toEqual(projectId);
        expect(response.body.name).toEqual(update_project.name); 
        expect(response.body.description).toEqual(update_project.description);
        expect(response.body.date_inclusion).toBe(update_project.date_inclusion);
    });

    it('Delete /api/v1/project/:id - Teste de rota de deletar projeto', async () => {
        const mock_project = {
            name: 'Trabalho de gestão de tarefas',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            userID: 1
        };

        const new_project = await Project.create(mock_project, { transaction });
        const projectId = new_project.id;

        await request(app).delete(`/api/v1/project/${projectId}`).expect(200);
    });

    it('Get /api/v1/project/ - Teste de rota de mostrar todos os projetos', async () => {
        const mock_project = {
            name: 'Trabalho de gestão de tarefas',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            userID: 1
        };

        await Project.create(mock_project, { transaction });
        const response = await request(app).get('/api/v1/project/').expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        const project = response.body[0];
        expect(project).toHaveProperty('name');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('date_inclusion'); 
        expect(project).toHaveProperty('userID'); 
    });

    it('Get /api/v1/project/:userID - Teste de rota de mostrar projetos pelo número de identificação do usuário', async () => {
        const mock_project = {
            name: 'Trabalho de gestão de tarefas',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            userID: 1
        };

        await Project.create(mock_project, { transaction });
        const response = await request(app).get(`/api/v1/project/${mock_project.userID}`).expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        response.body.forEach(project => {
            expect(project).toHaveProperty('name');
            expect(project).toHaveProperty('description');
            expect(project).toHaveProperty('date_inclusion');
            expect(project).toHaveProperty('userID', mock_project.userID); 
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
