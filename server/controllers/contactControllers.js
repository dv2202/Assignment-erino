const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNo, company, jobTitle } = req.body;
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNo,
      company,
      jobTitle,
    });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact)
      return res.status(404).json({
        message: "Contact not found",
      });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
