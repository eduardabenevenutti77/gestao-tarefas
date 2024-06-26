/* 
    * Usuários autenticados podem criar novos projetos.
    * Cada projeto deve ter um nome e descrição.
    * Usuários podem editar e excluir seus próprios projetos.
    * Usuários podem visualizar uma lista de seus projetos.
    * O nome dos projetos deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
*/

const Project = require('../models/project')

class ProjectController {
    async new_project(req, res) {
        const {name, description, date_inclusion, userID} = req.body;
        if (name === undefined || description === undefined || date_inclusion === undefined || userID === undefined) {
            throw new Error('Name, description, date_inclusion e userID são obrigatórios!');
        }
        try {
            const project = await Project.create({ name, description, date_inclusion, userID });
            return res.status(201).json(project);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async update_project(req, res) {
        const { id } = req.params;
        const { name, description, date_inclusion } = req.body;
        if (!id || !name || !description || !date_inclusion) {
            return res.status(400).json({ error: 'ID, name, description e date_inclusion são obrigatórios!'});
        }
        try {
            const project = await Project.findByPk(id);
            if (!project) {
                return res.status(404).json({error: 'Projeto não foi encontrado!'});
            }
            project.name = name;
            project.description = description;
            project.date_inclusion = date_inclusion;
            await project.save();
            return res.status(200).json(project);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async delete_project(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'O ID é obrigatório!'});
        }
        try {
            const project = await Project.findByPk(id);
            if (!project) {
                return res.status(404).json({ error: 'Projeto não foi encontrado!'});
            }
            await project.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    async show_all_project(req, res) {
        try {
            const project = await Project.findAll();
            return res.status(200).send(project);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async show_by_user(req, res) {
        const { userID } = req.params;
        if (!userID) {
            return res.status(400).json({ error: 'O id de usuário é obrigatório!'});
        }
        try {
            const project = await Project.findAll({ where: { userID } });
            if (!project) {
                return res.status(400).json({ error: 'Projeto não foi encontrado!'});
            }
            return res.status(200).send(project);
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

module.exports = new ProjectController();