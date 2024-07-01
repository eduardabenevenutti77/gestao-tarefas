/* 
    * Usuários autenticados podem criar novas tarefas associadas a projetos existentes.
    * Cada tarefa deve ter um título, descrição e status inicial como "pendente".
    * Usuários podem editar e excluir suas próprias tarefas.
    * Usuários podem visualizar uma lista de tarefas por projeto com filtros por status.
    * Cada tarefa deve registrar a data de criação automaticamente e permitir a adição de uma data de conclusão.
    * O título das tarefas deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
*/

const TaskController = require('../controllers/task')

class Task {
    async new_task(req, res) {
        const { title, description, date_inclusion, projectID } = req.body;
        try {
            const task = await TaskController.new_task(title, description, date_inclusion, projectID);
            return res.status(201).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    async update_task(req, res) {
        const { id } = req.params;
        const { title, description, date_complation, status } = req.body;
        try {
            const task = await TaskController.update_task(Number(id), title, description, date_complation, status);
            return res.status(200).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    async delete_task(req, res) {
        const { id } = req.params;
        try {
            await TaskController.delete_task(Number(id));
            return res.status(200).send();
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    async show_all_task(req, res) {
        try {
            const task = await TaskController.show_all_task();
            return res.status(200).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    async show_by_project(req, res) {
        const { projectID } = req.params;
        try {
            const task = await TaskController.show_by_project(Number(projectID));
            return res.status(200).send(task)
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    async show_by_status(req, res) {
        const { status } = req.body;
        try {
            const task = await TaskController.show_by_status(status);
            return res.status(200).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    async validate_token(req, res, next) {
        const token = req.headers.authorization;
        try {
            await TaskController.validate_token(token);
            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new Task();