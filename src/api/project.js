/* 
    * Usuários autenticados podem criar novos projetos.
    * Cada projeto deve ter um nome e descrição.
    * Usuários podem editar e excluir seus próprios projetos.
    * Usuários podem visualizar uma lista de seus projetos.
    * O nome dos projetos deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
*/

const ProjectController = require('../controllers/project')

class Project {
    async newProject(req, res) {
        const {name, description, date_inclusion, userID} = req.body;
        try {
            const project = await ProjectController.newProject(name, description, date_inclusion, userID);
            return res.status(201).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.menssage })
        }
    }
    async updateProject(req, res) {
        const {id, name, description, date_inclusion} = req.body;
    }
}