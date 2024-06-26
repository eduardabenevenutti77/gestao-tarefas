/* 
    * Usuários autenticados podem criar novas tarefas associadas a projetos existentes.
    * Cada tarefa deve ter um título, descrição e status inicial como "pendente".
    * Usuários podem editar e excluir suas próprias tarefas.
    * Usuários podem visualizar uma lista de tarefas por projeto com filtros por status.
    * Cada tarefa deve registrar a data de criação automaticamente e permitir a adição de uma data de conclusão.
    * O título das tarefas deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
*/

const Task = require('../models/task')

class TaskController {
    async new_task(req, res) {
        const {title, description, date_inclusion, date_complation, projectID} = req.body;
        if (title === undefined || description === undefined || date_inclusion === undefined || date_complation === undefined || projectID === undefined) {
            throw new Error('Name, description, date_inclusion, date_complation e projectID são obrigatórios');
        }
        try {
            const task = await Task.create({ title, description, date_inclusion, date_complation, projectID });
            return res.status(201).json(task);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async update_task(req, res) {
        const { id } = req.params;
        const { title, description, date_complation } = req.body;
        if (title === undefined || description === undefined || date_complation === undefined || projectID === undefined) {
            throw new Error('Name, description, date_complation e projectID são obrigatórios');
        }
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ error: 'Tarefa não foi encontrado! '});
            }
            task.title = title;
            task.description = description;
            task.date_complation = date_complation;
            await task.save();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async delete_task(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'O ID é obrigatório!'});
        }
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ error: 'Tarefa não foi encontrado!'});
            }
            await task.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async show_all_task(req, res) {
        try {
            const task = await Task.findAll();
            return res.status(200).send(task);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async show_by_project(req, res) {
        const { projectID } = req.params;
        if (!projectID) {
            return res.status(400).json({ error: 'O id de projeto é obrigatório!'});
        }
        try {
            const task = await Task.findAll({ where: { projectID } });
            if (!task) {
                return res.status(400).json({ error: 'Tarefa não foi encontrado!'});
            }
            return res.status(200).send(task);
        } catch (error) {
            return res.status(500).json({ error: error.message }); 
        }
    }
    async show_by_status(req, res) {
        const { status } = req.params;
        if (!status) {
            return res.status(400).json({ error: 'O status é obrigatório!'});
        }
        try {
            const task = await Task.findAll({ where: { status } });
            if (!task) {
                return res.status(400).json({ error: 'status não foi encontrado!'});
            }
            return res.status(200).send(task);
        } catch (error) {
            return res.status(500).json({ error: error.message }); 
        }
    }
    async validate_token(req, res) {
        const { token } = req.body;
        try {
            const validate = jwt.verify(token, JWT_SECRET_KEY);
            return res.status(200).json(validate);
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido! '});
        }
    }
}