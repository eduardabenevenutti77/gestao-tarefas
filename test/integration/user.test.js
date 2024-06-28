const { describe, expect, it, beforeAll, afterAll } = require('@jest/globals');
const UserController = require('../../src/controllers/user')
const conexao = require('../../src/database')

describe('Teste de User', () => {
    const servico = UserController
    beforeAll(async () => {
        this.transaction = await conexao.bd.transaction();
    });
    afterAll(async () => {
        await this.transaction.bd.rollback()
    });

    it('Adicionar usuário: ', async () => {
        const mockUser = { name: 'Maria Eduarda', email: 'maria@gmail.com', password: '123456'}

        const {dataValues} = await servico.new_user(mockUser, this.transaction )

        expect(dataValues.name).toBe(mockUser.name);
        expect(dataValues.email).toBe(mockUser.email);
        expect(dataValues.password).toBe(mockUser.password);
    })
})