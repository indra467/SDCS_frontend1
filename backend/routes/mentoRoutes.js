const express = require('express')
const router = express.Router()
const mentosController = require('../controllers/mentosController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(mentosController.getAllMentos)
    .post(mentosController.createNewMento)
    .patch(mentosController.updateMento)
    .delete(mentosController.deleteMento)

module.exports = router