const Sequelize = require('sequelize');
const database = new Sequelize(
    'gestao_tarefas',
    'root',
    '',
    { host: 'localhost', dialect: 'mysql'}
)