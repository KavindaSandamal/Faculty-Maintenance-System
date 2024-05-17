import React, { useState, useEffect } from 'react';
import classes from './modal.module.css'; // Import your CSS file for modal styling
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEmailModal = ({ currentUser, onClose }) => {
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    if (currentUser) {
      setNewEmail(''); // Set newEmail state to empty initially
    }
  }, [currentUser]);

  const handleChange = (event) => {
    setNewEmail(event.target.value); // Update the newEmail state as the user types
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a PUT request to update the email in the database
      await axios.put(`http://localhost:8000/user/update/${currentUser._id}`, { email: newEmail });
      onClose(); // Close the modal after successful update
      toast.success('Email updated successfully'); // Display success toast message
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.modalContent}>
          <h2>Edit Email</h2>
          <p>Current Email: {currentUser.email}</p>
          <form onSubmit={handleSubmit}>
            <label>
              New Email:
              <input type="email" value={newEmail} onChange={handleChange} />
            </label>
            <div className={classes.buttonContainer}>
              <button type="submit">Update</button>
              <button onClick={onClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmailModal;
