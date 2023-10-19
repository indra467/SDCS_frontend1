const express = require('express')
const router = express.Router()
const notifsController = require('../controllers/notifsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(notifsController.getAllNotifs)
    .post(notifsController.createNewNotif)
    

module.exports = router