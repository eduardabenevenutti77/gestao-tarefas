const { describe, expect, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../../src/server');
const sequelize = require('../../src/database');
const Task = require('../../src/models/task');
const Project = require('../../src/models/project');

describe('Teste de Integração - Task', () => {
    let transaction;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        transaction = await sequelize.transaction();
        const mockProject = {
            name: 'Projeto de Teste',
            description: 'Descrição do Projeto de Teste',
            date_inclusion: new Date().toISOString(),
            userID: 1
        };
        await Project.create(mockProject, { transaction });
    });

    afterEach(async () => {
        await transaction.rollback();
    });

    it('Post /api/v1/task/ - Teste de rota de criação de tarefas', async () => {
        const newTask = {
            title: 'Desenvolvimento de testes',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            projectID: 1
        };

        const response = await request(app).post('/api/v1/task/').send(newTask).set('transaction', transaction).expect(201);

        expect(response.body.title).toBe(newTask.title);
        expect(response.body.description).toBe(newTask.description);
        expect(response.body.date_inclusion).toBe(newTask.date_inclusion);
        expect(response.body.projectID).toBe(newTask.projectID);
    });

    it('Put /api/v1/task/:id - Teste de rota de alterar de tarefas', async () => {
        const mockTask = {
            title: 'Desenvolvimento de testes',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            projectID: 1
        };

        const newTask = await Task.create(mockTask, { transaction });
        const taskId = newTask.id;

        const updateTask = {
            id: taskId,
            title: 'Desenvolvimento de testes',
            description: 'Muito díficil de fazer! Alterado',
            date_completion: new Date().toISOString(),
            status: 'Em Andamento'
        };

        const response = await request(app).put(`/api/v1/task/${updateTask.id}`).send(updateTask).set('transaction', transaction).expect(200);

        expect(response.body.id).toEqual(updateTask.id);
        expect(response.body.title).toEqual(updateTask.title);
        expect(response.body.description).toEqual(updateTask.description);
        expect(response.body.date_completion).toBe(updateTask.date_completion);
        expect(response.body.status).toBe(updateTask.status);
    });

    it('Delete /api/v1/task/:id - Teste de rota de deletar tarefas', async () => {
        const mockTask = {
            title: 'Desenvolvimento de testes',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            projectID: 1
        };

        const newTask = await Task.create(mockTask, { transaction });
        const taskId = newTask.id;

        await request(app).delete(`/api/v1/task/${taskId}`).set('transaction', transaction).expect(200);
    });

    it('Get /api/v1/task/ - Teste de rota de mostrar todas as tarefas', async () => {
        const mockTask = {
            title: 'Desenvolvimento de testes',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            projectID: 1
        };

        await Task.create(mockTask, { transaction });

        const response = await request(app).get('/api/v1/task/').set('transaction', transaction).expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        const task = response.body[0];
        expect(task).toHaveProperty('title');
        expect(task).toHaveProperty('description');
        expect(task).toHaveProperty('date_inclusion');
        expect(task).toHaveProperty('date_completion');
        expect(task).toHaveProperty('status');
        expect(task).toHaveProperty('projectID');
    });

    it('Get /api/v1/task/:projectID - Teste de rota de mostrar tarefas pelo número de identificação do projeto', async () => {
        const mockTask = {
            title: 'Desenvolvimento de testes',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            projectID: 1
        };

        await Task.create(mockTask, { transaction });

        const response = await request(app).get(`/api/v1/task/${mockTask.projectID}`).set('transaction', transaction).expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach(task => {
            expect(task).toHaveProperty('title');
            expect(task).toHaveProperty('description');
            expect(task).toHaveProperty('date_inclusion');
            expect(task).toHaveProperty('date_completion');
            expect(task).toHaveProperty('status');
            expect(task).toHaveProperty('projectID', mockTask.projectID);
        });
    });

    it('Get /api/v1/task/:status - Teste de rota de mostrar tarefas pelo status', async () => {
        const mockTask = {
            title: 'Desenvolvimento de testes',
            description: 'Muito díficil de fazer!',
            date_inclusion: new Date().toISOString(),
            projectID: 1,
            status: 'Concluída'
        };

        await Task.create(mockTask, { transaction });

        const response = await request(app).get(`/api/v1/task/${mockTask.status}`).set('transaction', transaction).expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach(task => {
            expect(task).toHaveProperty('title');
            expect(task).toHaveProperty('description');
            expect(task).toHaveProperty('date_inclusion');
            expect(task).toHaveProperty('date_completion');
            expect(task).toHaveProperty('status', mockTask.status);
            expect(task).toHaveProperty('projectID');
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

});