const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.get("/", getContacts).post("/", createContacts);

router
  .get("/:id", getContact)
  .put("/:id", updateContact)
  .delete("/:id", deleteContact);

module.exports = router;
