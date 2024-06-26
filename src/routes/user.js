const express = require('express')
const UserApi = require('../api/user')
const router = express.Router()

router.post('/', UserApi.newUser)
router.get('/', UserApi.showUser)
router.put('/:id', UserApi.updateUser)
router.delete('/:id', UserApi.deleteUser)

module.exports = router