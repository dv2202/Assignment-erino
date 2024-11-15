const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: false,
    trim: true,
  },
  jobTitle: {
    type: String,
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
