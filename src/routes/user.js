const express = require('express')
const UserApi = require('../api/user')
const router = express.Router()

router.post('/', UserApi.new_user)
router.get('/', UserApi.show_user)
router.put('/:id', UserApi.update_user)
router.delete('/:id', UserApi.delete_ser)

module.exports = router