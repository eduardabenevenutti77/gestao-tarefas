/* 
    * Usuários autenticados podem criar novos projetos.
    * Cada projeto deve ter um nome e descrição.
    * Usuários podem editar e excluir seus próprios projetos.
    * Usuários podem visualizar uma lista de seus projetos.
    * O nome dos projetos deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
*/

const Project = require('../models/project');
const limiteCaracteres = 255;

class ProjectController {
    async new_project(name, description, date_inclusion, userID) {
        if (name === undefined || description === undefined || date_inclusion === undefined || userID === undefined) {
            throw new Error('Name, description, date_inclusion e userID são obrigatórios!');
        } else if (/\d/.test(name)) {
            // peguei da minha atividade em dupla com a carol de testes
            throw new Error('O name deve conter apenas letras!')
        } else if (name.lenght > limiteCaracteres) {
            // peguei da minha atividade em dupla com a carol de testes
            throw new Error("Desculpe, o limite de caracteres foi excedido no campo 'name'. Por favor, inserir um name com até 255 carateres!");
        }
        try {
            const project = await Project.create({ name, description, date_inclusion, userID });
            return project;
        } catch (error) {
            return error;
        }
    }
    async update_project(id, name, description, date_inclusion) {
        if (!id || !name || !description || !date_inclusion) {
            throw new Error('ID, name, description e date_inclusion são obrigatórios!');
        } else if (/\d/.test(name)) {
            // peguei da minha atividade em dupla com a carol de testes
            throw new Error('O name deve conter apenas letras!')
        } else if (name.lenght > limiteCaracteres) {
            // peguei da minha atividade em dupla com a carol de testes
            throw new Error("Desculpe, o limite de caracteres foi excedido no campo 'name'. Por favor, inserir um name com até 255 carateres!");
        }
        try {
            const project = await Project.findByPk(id);
            if (!project) {
                throw new Error('Projeto não foi encontrado!');
            }
            project.name = name;
            project.description = description;
            project.date_inclusion = date_inclusion;
            await project.save();
            return project;
        } catch (error) {
            return error;
        }
    }
    async delete_project(id) {
        if (!id) {
            throw new Error('O ID é obrigatório!');
        }
        try {
            const project = await Project.findByPk(id);
            if (!project) {
                throw new Error('Projeto não foi encontrado!');
            }
            await project.destroy();
        } catch (error) {
            return error;
        }
    }
    async show_all_project() {
        try {
            const project = await Project.findAll();
            return project;
        } catch (error) {
            return error;
        }
    }
    async show_by_user(userID) {
        if (!userID) {
            throw new Error('O id de usuário é obrigatório!');
        }
        try {
            const project = await Project.findAll({ where: { userID } });
            if (!project) {
                throw new Error('Projeto não foi encontrado!');
            }
            return project;
        } catch (error) {
            return error; 
        }
    }
    async validate_token(token) {
        try {
            const validate = jwt.verify(token, JWT_SECRET_KEY);
            return validate;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new ProjectController();