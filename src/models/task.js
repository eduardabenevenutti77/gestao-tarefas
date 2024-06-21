/* 
    * Usuários autenticados podem criar novas tarefas associadas a projetos existentes.
    * Cada tarefa deve ter um título, descrição e status inicial como "pendente".
    * Usuários podem editar e excluir suas próprias tarefas.
    * Usuários podem visualizar uma lista de tarefas por projeto com filtros por status.
    * Cada tarefa deve registrar a data de criação automaticamente e permitir a adição de uma data de conclusão.
    * O título das tarefas deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
    
     ID (único)
    * Título
    * Descrição
    * Data de criação
    * Data de conclusão (opcional)
    * Status (pendente, em andamento, concluída)
    * ID do Projeto (relacionamento com a entidade Projeto)
*/

// const { type } = require('os');
// const { type } = require('os');
const database = require('../config/database');
const projectID = require('../models/project');

class Task {
    constructor() {
        this.model = database.define('tasks', {
            id: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.Sequelize.STRING
            },
            descricao: {
                type: database.Sequelize.STRING
            },
            data_criacao: {
                type: database.Sequelize.DATATIME
            },
            data_conclusao: {
                type: database.Sequelize.DATATIME
            },
            status: {
                type: database.Sequelize.STRING
            },
            projectID: {
                type: database.Sequelize.INTEGER,
                references: {
                    model: 'projects',
                    key: 'id'
                }
            }
        })
    }
}

// projectID.belongsTo(projectID, { foreingKey: 'projectID' })
module.exports = (new Task).model;