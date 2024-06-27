/* 
    * Usuários autenticados podem criar novos projetos.
    * Cada projeto deve ter um nome e descrição.
    * Usuários podem editar e excluir seus próprios projetos.
    * Usuários podem visualizar uma lista de seus projetos.
    * O nome dos projetos deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
    
    * ID (único)
    * Nome
    * Descrição
    * Data de criação
    * ID do Usuário (relacionamento com a entidade Usuário)
*/

const Sequelize = require('sequelize');
const database = require('../database')
const userID = require('../models/user');

class Project {
    constructor() {
        this.model = database.db.define('projects', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: database.db.Sequelize.STRING
            },
            description: {
                type: database.db.Sequelize.STRING
            },
            date_inclusion: {
                type: database.db.Sequelize.DATE
            },
            userID: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        })
    }
}

// userID.belongsTo(userID, { foreingKey: 'userID' })
module.exports = (new Project).model;