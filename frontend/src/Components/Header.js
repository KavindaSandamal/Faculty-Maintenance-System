import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import classes from './header.module.css'; 
import { FaUser } from 'react-icons/fa'; // Import the user icon from Font Awesome
import axios from 'axios'; // Import axios for making HTTP requests
import UpdateFullNameModal from './UpdateFullNameModal';
import UpdateEmailModal from './UpdateEmailModal';
import UpdatePasswordModal from './UpdatePasswordModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [showSecondDropdown, setShowSecondDropdown] = useState(false); // State to manage second dropdown visibility
  const [currentUser, setCurrentUser] = useState(null); // State to store current user
  const location = useLocation(); // Hook to access the current URL
  const [showModal, setShowModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userId = getUserIdFromUrl(location.pathname);
        if (userId) {
          const response = await axios.get(`http://localhost:8000/user/${userId}`);
          if (response.data.success) {
            setCurrentUser(response.data.user);
          } else {
            console.error('Failed to fetch user details');
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchCurrentUser();
  }, [location.pathname]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle the first dropdown visibility
  };

  const toggleSecondDropdown = () => {
    setShowSecondDropdown(!showSecondDropdown); // Toggle the second dropdown visibility
  };

  const toggleModal = (modalName) => {
    setShowModal(!showModal); // Toggle the modal visibility
    setSelectedModal(modalName); // Set the selected modal
    setShowSecondDropdown(false); // Close the second dropdown when opening the modal
  };

  const getUserIdFromUrl = (pathname) => {
    const parts = pathname.split('/');
    return parts[parts.length - 1]; // Last segment is the user ID
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/'); // Redirect to home page
    toast.success('Logout successfully');
  };

  const handleDashboardClick = () => {
    // Check if user is logged in
    if (currentUser) {
      // Redirect based on user role
      if (currentUser.role === 'Student') {
        navigate(`/studentPage/${currentUser._id}`);
      } else if (currentUser.role === 'Academic Staff') {
        navigate(`/academicStaffPage/${currentUser._id}`);
      } else if (currentUser.role === 'Maintenance Division') {
        navigate(`/maintenanceDivisionPage/${currentUser._id}`);
      }
    } else {
      // If user is not logged in, navigate to the login page
      navigate('/Login');
    }
  };
  
  
  
  
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/images/logo.jpeg" alt="ENG FMMS Logo" width="30" height="34" className="d-inline-block align-text-top" />
          <span style={{ marginLeft: '20px', fontSize: '25px' , fontWeight:'bolder' }} className="FMMS">ENG FMMS</span>
        </a>
      
        <div className={classes.header}>
          <div className={classes.container}>
            <Link to="/" className={classes.Home}>
              HOME
            </Link>
            <a href="/#about" className={classes.About_Us}>ABOUT US</a>
            
            <a href="/#contact" className={classes.Dashboard}>CONTACT US</a>
            <a href="#" className={classes.Dashboard} onClick={handleDashboardClick}>
              DASHBOARD
            </a>

   
      {currentUser ? (
        <div className={classes.currentUser}>
          <div className={classes.profileIcon} onClick={toggleDropdown}>
            <FaUser />
            <span className={classes.userName} >
              Welcome, {currentUser.fullName}
            </span>
          </div>
          {showDropdown && (
            <div className={classes.dropdown}>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={toggleSecondDropdown}>Edit</button>
              {showSecondDropdown && (
                <div className={classes.secondDropdown}>
                  <button onClick={() => toggleModal('UpdateFullName')}>Update Full Name</button>
                  <button onClick={() => toggleModal('UpdateEmail')}>Update Email</button>
                  <button onClick={() => toggleModal('UpdatePassword')}>Update Password</button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Link to="/Login" className={classes.Login} >
          LOGIN
        </Link>
      )}
      {showModal && selectedModal === 'UpdateFullName' && <UpdateFullNameModal currentUser={currentUser} onClose={toggleModal} />}
      {showModal && selectedModal === 'UpdateEmail' && <UpdateEmailModal currentUser={currentUser} onClose={toggleModal} />}
      {showModal && selectedModal === 'UpdatePassword' && <UpdatePasswordModal currentUser={currentUser} onClose={toggleModal} />}
       </div>
       </div>
       
       </div>
    </nav>
    
  );
}
