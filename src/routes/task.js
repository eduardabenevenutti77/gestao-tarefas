const express = require('express')
const TaskApi = require('../api/task')
const router = express.Router()

router.post('/', TaskApi.new_task)
router.get('/', TaskApi.show_all_task)
router.get('/:projectID', TaskApi.show_by_project)
router.get('/:status', TaskApi.show_by_status)
router.put('/:id', TaskApi.update_task)
router.delete('/:id', TaskApi.delete_task)

module.exports = router