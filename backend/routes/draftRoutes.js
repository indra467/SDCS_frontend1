const express = require('express')
const router = express.Router()
const draftsController = require('../controllers/draftsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(draftsController.getAllDrafts)
    .post(draftsController.createNewDraft)
    .patch(draftsController.updateDraft)
    .delete(draftsController.deleteDraft)

module.exports = router