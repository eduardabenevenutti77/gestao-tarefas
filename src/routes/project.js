const express = require('express')
const ProjectApi = require('../api/project')
const router = express.Router()

router.post('/', ProjectApi.new_project)
router.get('/', ProjectApi.show_all_project)
router.get('/:userID', ProjectApi.show_by_user)
router.put('/:id', ProjectApi.update_project)
router.delete('/:id', ProjectApi.delete_project)

module.exports = router