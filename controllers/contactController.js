const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@ desc Get all Contacts
// @route GET /api/contacts
// @access Public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@ desc Create New Contacts
// @route POST /api/contacts
// @access Public

const createContacts = asyncHandler(async (req, res) => {
  try {
    console.log("The request body is : ", req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      res.status(404).json({ message: "All fields are mandatory !" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
    });

    res.status(201).json(contact);
  } catch (error) {
    console.log("The error is : ", error);
    res.status(404).json({ error: error.message });
  }
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    console.log("The request body is : ", req.body);

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.log("The error is : ", error);
    res.status(404).json({ error: error.message });
  }
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    console.log("The request body is : ", req.body);

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    }

    const updateContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updateContact);
  } catch (error) {
    console.log("The error is : ", error);
    res.status(404).json({ error: error.message });
  }
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    console.log("The request body is : ", req.body);

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    }

    await Contact.deleteOne(contact);
    res.status(200).json(contact);
  } catch (error) {
    console.log("The error is : ", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
