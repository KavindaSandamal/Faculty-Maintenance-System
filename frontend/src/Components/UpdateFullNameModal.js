import React, { useState, useEffect } from 'react';
import classes from './modal.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateFullNameModal = ({ currentUser, onClose }) => {
  const [newFullName, setNewFullName] = useState('');

  useEffect(() => {
    if (currentUser) {
      setNewFullName('');
    }
  }, [currentUser]);

  const handleChange = (event) => {
    setNewFullName(event.target.value); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      await axios.put(`https://faculty-maintenance-system-api.vercel.app/api/user/update/${currentUser._id}`, { fullName: newFullName });
      onClose(); 
      toast.success('Full Name updated successfully');
    } catch (error) {
      console.error('Error updating full name:', error);
    }
  };

  if (!currentUser) {
    return null; 
  }

  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.modalContent}>
          <h2>Edit Full Name</h2>
          <p>Current Full Name: {currentUser.fullName}</p>
          <form onSubmit={handleSubmit}>
            <label>
              New Full Name:
              <input type="text" value={newFullName} onChange={handleChange} />
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

export default UpdateFullNameModal;
