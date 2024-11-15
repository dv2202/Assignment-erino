import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactTable from "../ContactTable";
import { IoPersonAdd } from "react-icons/io5";
import AddContactForm from "../AddContactForm";

const ContactPage = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [searchContacts, setSearchContacts] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/contacts`
      );
      if (response.status === 200) {
        setAllContacts(response.data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleContactFormToggle = () => {
    setShowContactForm((prev) => !prev);
  };

  const filteredContacts = allContacts.filter((contact) => {
    const search = searchContacts.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(search) ||
      contact.lastName.toLowerCase().includes(search) ||
      contact.email.toLowerCase().includes(search) ||
      contact.phoneNo.toString().includes(search) ||
      contact.company.toLowerCase().includes(search) ||
      contact.jobTitle.toLowerCase().includes(search)
    );
  });

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full px-2 py-3 flex flex-row justify-between items-center">
        <p className="font-bold text-xl pl-2">📇 Contact Management</p>
        <div className="rounded-md p-1 flex flex-row gap-2 items-center">
          <input
            type="text"
            placeholder="Search contacts ..."
            value={searchContacts}
            onChange={(e) => setSearchContacts(e.target.value)}
            className="w-[450px] p-2 rounded-md border border-gray-300 outline-none"
          />
          <div
            className="bg-slate-200 rounded-md p-2 cursor-pointer"
            onClick={handleContactFormToggle}
          >
            <IoPersonAdd />
          </div>
        </div>
      </div>

      {/* Contact Table */}
      <ContactTable allContacts={filteredContacts} refreshContacts={fetchContacts} />

      {/* Add Contact Form */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white rounded-md shadow-lg">
            <AddContactForm onCloseForm={handleContactFormToggle} refreshContacts={fetchContacts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
