/* 
    * Usuários autenticados podem criar novas tarefas associadas a projetos existentes.
    * Cada tarefa deve ter um título, descrição e status inicial como "pendente".
    * Usuários podem editar e excluir suas próprias tarefas.
    * Usuários podem visualizar uma lista de tarefas por projeto com filtros por status.
    * Cada tarefa deve registrar a data de criação automaticamente e permitir a adição de uma data de conclusão.
    * O título das tarefas deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
*/

const Task = require('../models/task');
const limiteCaracteres = 255;

class TaskController {
    async new_task(title, description, date_inclusion, projectID) {
        if (title === undefined || description === undefined || date_inclusion === undefined || projectID === undefined) {
            throw new Error('title, description, date_inclusion e projectID são obrigatórios');
        } else if (/\d/.test(title)) {
            // peguei da minha atividade em dupla com a carol de testes
            throw new Error('O title deve conter apenas letras!')
        } else if (title.lenght > limiteCaracteres) {
            // peguei da minha atividade em dupla com a carol de testes
            throw new Error("Desculpe, o limite de caracteres foi excedido no campo 'title'. Por favor, inserir um title com até 255 carateres!");
        }
        try {
            const task = await Task.create({ title, description, date_inclusion, date_complation, projectID });
            return task;
        } catch (error) {
            return error;
        }
    }
    async update_task(id, title, description, date_complation) {
        if (title === undefined || description === undefined || date_complation === undefined || projectID === undefined) {
            throw new Error('title, description, date_complation e projectID são obrigatórios');
        } else if (/\d/.test(title)) {
            // peguei da minha atividade em dupla com a carol de testes
            throw new Error('O title deve conter apenas letras!')
        } else if (title.lenght > limiteCaracteres) {
            // peguei da minha atividade em dupla com a carol de testes
            throw new Error("Desculpe, o limite de caracteres foi excedido no campo 'title'. Por favor, inserir um title com até 255 carateres!");
        }
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                throw new Error('Tarefa não foi encontrado! ');
            }
            task.title = title;
            task.description = description;
            task.date_complation = date_complation;
            await task.save();
            return task;
        } catch (error) {
            return error;
        }
    }
    async delete_task(id) {
        if (!id) {
            throw new Error('O ID é obrigatório!');
        }
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                throw new Error('Tarefa não foi encontrado!');
            }
            await task.destroy();
        } catch (error) {
            return error;
        }
    }
    async show_all_task() {
        try {
            const task = await Task.findAll();
            return task;
        } catch (error) {
            return error;
        }
    }
    async show_by_project(projectID) {
        if (!projectID) {
            throw new Error('O id de projeto é obrigatório!');
        }
        try {
            const task = await Task.findAll({ where: { projectID } });
            if (!task) {
                throw new Error('Tarefa não foi encontrado!');
            }
            return task;
        } catch (error) {
            return error; 
        }
    }
    async show_by_status(status) {
        if (!status) {
            throw new Error('O status é obrigatório!');
        }
        try {
            const task = await Task.findAll({ where: { status } });
            if (!task) {
                throw new Error('status não foi encontrado!');
            }
            return task;
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

module.exports = new TaskController();