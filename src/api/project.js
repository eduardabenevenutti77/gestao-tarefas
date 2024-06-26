/* 
    * Usuários autenticados podem criar novos projetos.
    * Cada projeto deve ter um nome e descrição.
    * Usuários podem editar e excluir seus próprios projetos.
    * Usuários podem visualizar uma lista de seus projetos.
    * O nome dos projetos deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
*/

const ProjectController = require('../controllers/project')

class Project {
    async new_project(req, res) {
        const {name, description, date_inclusion, userID} = req.body;
        try {
            const project = await ProjectController.new_project(name, description, date_inclusion, userID);
            return res.status(201).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.menssage })
        }
    }
    async update_project(req, res) {
        const {id, name, description, date_inclusion} = req.body;
        try {
            const project = await ProjectController.update_project(Number(id), name, description, date_inclusion);
            return res.status(200).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.menssage });
        }
    }
    async delete_project(req, res) {
        const {id} = req.body;
        try {
            await ProjectController.delete_project(Number(id));
            return res.status(200).send();
        } catch (error) {
            return res.status(400).send({ error: error.menssage });
        }
    }
    async show_all_project(req, res) {
        try {
            const project = await ProjectController.show_all_project();
            return res.status(200).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.menssage })
        }
    }
    async show_by_user(req, res) {
        const {userID} = req.body;
        try {
            const project = await ProjectController.show_by_user(Number(userID));
            return res.status(200).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new Project();