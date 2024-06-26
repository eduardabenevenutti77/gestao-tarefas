const express = require('express');
const UserApi = require('../api/user');
const server = require('../server');

const app = express()
app.use(express.json())

app.post('/login', UserApi.login);
app.post('/user', UserApi.newUser);
app.use(UserApi.validateToken);
app.get('/user', UserApi.showUser);
app.put('/user/:id', UserApi.updateUser);
app.delete('/user/:id', UserApi.deleteUser);