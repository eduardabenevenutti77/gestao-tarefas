const express = require('express');
const cors = require('cors');
const database = require('../src/config/database');

const app = express()
app.use(express.json());
app.use(cors());

database.db.sync({ force: true })
    .then(_ => {
        app.listen(8000, _ => {
            console.log('Server running on port 8000')
        })
    })
    .catch(e => {
        console.error(`Erro ao inicializar o banco de dados ${e}`)
    })