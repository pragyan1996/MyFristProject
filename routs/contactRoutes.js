const express = require('express')
const router = express.Router();
const { getContact,addContact, getAContact, editAContact, deleteAContact } = require('../Controller/contactController');
const validetToken = require('../middleware/validateTokenHandler');

router.use(validetToken);
router.route("/").get(getContact)

router.route("/").post(addContact)

router.route("/:id").put(editAContact)

router.route("/:id").get(getAContact)

router.route("/:id").delete(deleteAContact)



module.exports = router
