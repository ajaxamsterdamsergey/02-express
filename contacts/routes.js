/* const { Router } = require('express'); */
const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  validateInfoForUpdate,
  validateId
} = require('./controllers');
const app = express();

/* const router = Router(); */
app.get("/api/contacts", (req, resp) => {
    listContacts();
  });

router.get('/', listContacts);
router.get('/:contactId', validateId, getContactById);
router.post('', addContact);
router.delete('/:contactId', validateId, removeContact);
router.patch('/:contactId', validateId, validateInfoForUpdate, updateContact);

module.exports = router;