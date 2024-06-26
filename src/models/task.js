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
            title: {
                type: database.Sequelize.STRING
            },
            description: {
                type: database.Sequelize.STRING
            },
            date_inclusion: {
                type: database.Sequelize.DATATIME
            },
            date_complation: {
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