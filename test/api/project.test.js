// const request = require('supertest');
// const app = require('../../src/server'); 

// describe('Teste de API - Project', () => {
//     it('Post /api/v1/project/ - Teste de rota de criação do projetos', async () => {
//         const new_project = {
//             name: 'Trabalho de gestão de tarefas',
//             description: 'Muito díficil de fazer!',
//             date_inclusion: new Date().toISOString(),
//             userID: 1
//         }
//         const response = await request(app).post('/api/v1/project/').send(new_project).expect(201);
//         expect(response.body.name).toBe(new_project.name);
//         expect(response.body.description).toBe(new_project.description);
//         expect(response.body.date_inclusion).toBe(new_project.date_inclusion);
//         expect(response.body.userID).toBe(new_project.userID);
//     });

//     it('Put /api/v1/project/:id - Teste de rota de alterar do projetos', async () => {
//         const update_project = {
//             id: 3,
//             name: 'Trabalho de gestão de tarefas', 
//             description: 'Muito díficil de fazer! Vou trancar a faculdade ;3',
//             date_inclusion: new Date().toISOString()
//         }
//         try {
//             const response = await request(app).put(`/api/v1/project/${update_project.id}`).send(update_project);
//             console.log('Dados enviados no response:', response.body); 
//             expect(response.statusCode).toBe(200);
//             expect(response.body.id).toEqual(update_project.id);
//             expect(response.body.name).toEqual(update_project.name); 
//             expect(response.body.description).toEqual(update_project.description);
//             expect(response.body.date_inclusion).toBe(update_project.date_inclusion);
//         } catch (error) {
//             console.error('Error:', error); 
//             throw error; 
//         }
//     });  

//     it('Delete /api/v1/prject/:id - Teste de rota de deletar projeto', async () => {
//         const delete_project = {
//             id: 1
//         }
//         try {
//             const response = await request(app).delete(`/api/v1/project/${delete_project.id}`);
//             console.log('Dados enviados no response: ', response.body);
//             expect(response.statusCode).toBe(200);
//         } catch (error) {
//             console.error('Error:', error); 
//             throw error; 
//         }
//     }); 

//     it('Get /api/v1/project/ - Teste de rota de mostrar todos os projetos', async () => {
//         try {
//             const response = await request(app).get('/api/v1/project/');
//             console.log('Dados enviados no response: ', response.body);
//             expect(response.body).toBeInstanceOf(Array);
//             expect(response.body.length).toBeGreaterThan(0);
//             const project = response.body[0];
//             expect(project).toHaveProperty('name');
//             expect(project).toHaveProperty('description');
//             expect(project).toHaveProperty('date_inclusion'); 
//             expect(project).toHaveProperty('userID'); 
//         } catch (error) {
//             console.error('Error:', error); 
//             throw error; 
//         }
//     });    

//     it('Get /api/v1/projects/:userID - Teste de rota de mostrar projetos pelo número de identificação do usuário', async () => {
//         try {
//             const show_by_user = {
//                 userID: 1 
//             };
//             const response = await request(app).get(`/api/v1/project/${show_by_user.userID}`);
//             console.log('Dados enviados no response: ', response.body);
//             expect(response.body).toBeInstanceOf(Array);
//             expect(response.body.length).toBeGreaterThan(0);
//             response.body.forEach(project => {
//                 expect(project).toHaveProperty('name');
//                 expect(project).toHaveProperty('description');
//                 expect(project).toHaveProperty('date_inclusion');
//                 expect(project).toHaveProperty('userID', show_by_user.userID); 
//             });
//         } catch (error) {
//             console.error('Error:', error);
//             throw error;
//         }
//     });    
// });