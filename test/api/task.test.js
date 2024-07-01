// const request = require('supertest');
// const app = require('../../src/server'); 

// describe('Teste de API - Task', () => {
//     it('Post /api/v1/task/ - Teste de rota de criação de tarefas', async () => {
//         const new_task = {
//             title: 'Desenvolvimento de testes',
//             description: 'Muito díficil de fazer!',
//             date_inclusion: new Date().toISOString(),
//             projectID: 1
//         }
//         const response = await request(app).post('/api/v1/task/').send(new_task).expect(201);
//         expect(response.body.title).toBe(new_task.title);
//         expect(response.body.description).toBe(new_task.description);
//         expect(response.body.date_inclusion).toBe(new_task.date_inclusion);
//         expect(response.body.projectID).toBe(new_task.projectID);
//     });

//     it('Put /api/v1/task/:id - Teste de rota de alterar de tarefas', async () => {
//         const update_task = {
//             id: 1,
//             title: 'Desenvolvimento de testes',
//             description: 'Muito díficil de fazer!',
//             date_complation: new Date().toISOString(),
//             status: 'Em Andamento'
//         }
//         try {
//             const response = await request(app).put(`/api/v1/task/${update_task.id}`).send(update_task);
//             console.log('Dados enviados no response:', response.body); 
//             expect(response.statusCode).toBe(200);
//             expect(response.body.id).toEqual(update_task.id);
//             expect(response.body.title).toEqual(update_task.title); 
//             expect(response.body.description).toEqual(update_task.description);
//             expect(response.body.date_complation).toBe(update_task.date_complation);
//             expect(response.body.status).toBe(update_task.status);
//         } catch (error) {
//             console.error('Error:', error); 
//             throw error; 
//         }
//     });  

//     it('Delete /api/v1/task/:id - Teste de rota de deletar tarefas', async () => {
//         const delete_task = {
//             id: 1
//         }
//         try {
//             const response = await request(app).delete(`/api/v1/task/${delete_task.id}`);
//             console.log('Dados enviados no response: ', response.body);
//             expect(response.statusCode).toBe(200);
//         } catch (error) {
//             console.error('Error:', error); 
//             throw error; 
//         }
//     }); 

//     it('Get /api/v1/task/ - Teste de rota de mostrar todos as tarefas', async () => {
//         try {
//             const response = await request(app).get('/api/v1/task/');
//             console.log('Dados enviados no response: ', response.body);
//             expect(response.body).toBeInstanceOf(Array);
//             expect(response.body.length).toBeGreaterThan(0);
//             const task = response.body[0];
//             expect(task).toHaveProperty('title');
//             expect(task).toHaveProperty('description');
//             expect(task).toHaveProperty('date_inclusion'); 
//             expect(task).toHaveProperty('date_complation'); 
//             expect(task).toHaveProperty('status'); 
//             expect(task).toHaveProperty('projectID'); 
//         } catch (error) {
//             console.error('Error:', error); 
//             throw error; 
//         }
//     });    

//     it('Get /api/v1/task/:projectID - Teste de rota de mostrar tarefas pelo número de identificação do projeto', async () => {
//         try {
//             const show_by_project = {
//                 projectID: 1 
//             };
//             const response = await request(app).get(`/api/v1/task/${show_by_project.projectID}`);
//             console.log('Dados enviados no response: ', response.body);
//             expect(response.body).toBeInstanceOf(Array);
//             expect(response.body.length).toBeGreaterThan(0);
//             response.body.forEach(task => {
//                 expect(task).toHaveProperty('title');
//                 expect(task).toHaveProperty('description');
//                 expect(task).toHaveProperty('date_inclusion'); 
//                 expect(task).toHaveProperty('date_complation'); 
//                 expect(task).toHaveProperty('status'); 
//                 expect(task).toHaveProperty('projectID', show_by_project.projectID); 
//             });
//         } catch (error) {
//             console.error('Error:', error);
//             throw error;
//         }
//     });    

//     it('Get /api/v1/task/:status - Teste de rota de mostrar tarefas pelo status', async () => {
//         try {
//             const show_by_status = {
//                 status: 'Concluída'
//             };
//             const response = await request(app).get(`/api/v1/task/${show_by_status.status}`);
//             console.log('Dados enviados no response: ', response.body);
//             expect(response.body).toBeInstanceOf(Array);
//             expect(response.body.length).toBeGreaterThan(0);
//             response.body.forEach(task => {
//                 expect(task).toHaveProperty('title');
//                 expect(task).toHaveProperty('description');
//                 expect(task).toHaveProperty('date_inclusion'); 
//                 expect(task).toHaveProperty('date_complation'); 
//                 expect(task).toHaveProperty('status', show_by_status.status); 
//                 expect(task).toHaveProperty('projectID'); 
//             });
//         } catch (error) {
//             console.error('Error:', error);
//             throw error;
//         }
//     }); 
// });