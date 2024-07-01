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
const Sequelize = require('sequelize');
const database = require('../database')
const projectID = require('../models/project');

class Task {
    constructor() {
        this.model = database.db.define('tasks', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: database.db.Sequelize.STRING(255)
            },
            description: {
                type: database.db.Sequelize.STRING
            },
            date_inclusion: {
                type: database.db.Sequelize.DATE
            },
            date_complation: {
                type: database.db.Sequelize.DATE
            },
            status: {
                type: database.db.Sequelize.STRING,
                values: 'Pedente'
            },
            projectID: {
                type: database.db.Sequelize.INTEGER,
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