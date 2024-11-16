import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Pagination,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const ContactTable = ({ allContacts, refreshContacts }) => {
  const [open, setOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentContacts = allContacts.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value); 
      };

  const handleOpen = (contact) => {
    setCurrentContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentContact(null);
    setOpen(false);
  };

  const handleEditFormOpen = (contact) => {
    setCurrentContact(contact);
    setEditFormOpen(true);
  };

  const handleEditFormClose = () => {
    setCurrentContact(null);
    setEditFormOpen(false);
  };

  const handleDelete = async () => {
    if (!currentContact) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/v1/contacts/${currentContact._id}`
      );
      toast.success("Contact deleted successfully");
      refreshContacts();
    } catch (error) {
      toast.error("Failed to delete contact");
      console.error(error);
    } finally {
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact({ ...currentContact, [name]: value });
  };

  const handleEditForm = async () => {
    if (!currentContact) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/v1/contacts/${currentContact._id}`,
        currentContact // Pass the updated contact details here
      );
      toast.success("Contact updated successfully");
      refreshContacts();
    } catch (error) {
      toast.error("Failed to update contact");
      console.error(error);
    } finally {
      handleEditFormClose();
    }
  };

  return (
    <div className="w-full h-full px-4">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentContacts?.length > 0 ? (
              currentContacts.sort((a, b) => a.firstName.localeCompare(b.firstName)).map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>{contact.firstName}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phoneNo}</TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>{contact.jobTitle}</TableCell>
                    <TableCell>
                      <div className="flex flex-row gap-3">
                        <button
                          className="bg-blue-500 text-white p-2 rounded-md"
                          onClick={() => handleEditFormOpen(contact)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white p-2 rounded-md"
                          onClick={() => handleOpen(contact)}
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No contacts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Are you sure you want to delete this contact?
          </Typography>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Edit Form Modal */}
      <Modal open={editFormOpen} onClose={handleEditFormClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Contact Details
          </Typography>
          <div>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={currentContact?.firstName || ""}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={currentContact?.lastName || ""}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone No"
              name="phoneNo"
              value={currentContact?.phoneNo || ""}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={currentContact?.email || ""}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={currentContact?.company || ""}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              value={currentContact?.jobTitle || ""}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleEditForm}
            >
              Save Changes
            </Button>
          </div>
        </Box>
      </Modal>

      <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
      <Pagination
        count={Math.ceil(allContacts.length / itemsPerPage)} 
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Stack>
    </div>
  );
};

export default ContactTable;
