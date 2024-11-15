import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

const AddContactForm = ({ onCloseForm,refreshContacts }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    company: "",
    jobTitle:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(contact);
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/contacts`, contact);
        if (response.status === 201) {
            console.log('Contact added successfully');
            onCloseForm();
            refreshContacts();
        }
    } catch (error) {
      console.log(error.message);
    }
    setShowContactForm(false);
    setContact({
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      company: "",
      jobTitle:""
    });
    
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 800, mx: "auto", p: 3, borderRadius: 1, boxShadow: 3 }}
    >
      <div className="flex flex-row justify-between items-center">
        <Typography variant="h6" gutterBottom>
          Add New Contact
        </Typography>
        <IoCloseSharp
          className="cursor-pointer text-red-600 font-semibold text-xl"
          onClick={onCloseForm}
        />
      </div>

      <div className="flex flex-row gap-5 text-black">
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={contact.firstName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={contact.lastName}
          onChange={handleChange}
          margin="normal"
          required
        />
      </div>

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={contact.email}
        onChange={handleChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="phoneNo"
        name="phoneNo"
        value={contact.phoneNo}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Company"
        name="company"
        value={contact.company}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Job Title"
        name="jobTitle"
        value={contact.jobTitle}
        onChange={handleChange}
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Contact
      </Button>
    </Box>
  );
};

export default AddContactForm;
