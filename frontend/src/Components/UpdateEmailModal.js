import React, { useState, useEffect } from 'react';
import classes from './modal.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEmailModal = ({ currentUser, onClose }) => {
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    if (currentUser) {
      setNewEmail(''); 
    }
  }, [currentUser]);

  const handleChange = (event) => {
    setNewEmail(event.target.value); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      await axios.put(`https://faculty-maintenance-system-api.vercel.app/api/user/update/${currentUser._id}`, { email: newEmail });
      onClose(); 
      toast.success('Email updated successfully'); 
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
