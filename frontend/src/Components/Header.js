import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import classes from './header.module.css'; 
import { FaUser } from 'react-icons/fa'; // Import the user icon from Font Awesome
import axios from 'axios'; // Import axios for making HTTP requests
import UpdateFullNameModal from './UpdateFullNameModal';
import UpdateEmailModal from './UpdateEmailModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userId = getUserIdFromUrl(location.pathname);
        if (userId) {
          const response = await axios.get(`https://faculty-maintenance-system-api.vercel.app/api/user/${userId}`);
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
    setShowSecondDropdown(false); // Close the second dropdown when opening the first
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
    toast.success('Logout successful');
  };

  const handleDashboardClick = () => {
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
      navigate('/Login'); // If user not logged in, navigate to login page
    }
  };
  
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/images/logo.jpeg" alt="ENG FMMS Logo" width="30" height="34" className="d-inline-block align-text-top" />
          <span style={{ marginLeft: '20px', fontSize: '25px', fontWeight:'bolder' }} className="FMMS">ENG FMMS</span>
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
                  <span className={classes.userName}>
                    Welcome, {currentUser.fullName}
                  </span>
                </div>
                {showDropdown && (
                  <div className={classes.dropdown}>
                    <button className="btn btn-info" onClick={handleLogout}>Logout</button>
                    <button className="btn btn-info" onClick={toggleSecondDropdown}>Edit Profile</button>
                    {showSecondDropdown && (
                      <div className={classes.secondDropdown}>
                        <button className="btn btn-info" onClick={() => toggleModal('UpdateFullName')}>Update Full Name</button>
                        <button className="btn btn-info" onClick={() => toggleModal('UpdateEmail')}>Update Email</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null }
            {currentUser ? null : (
              <Link to="/Login" className={`${classes.Login} `}>
                LOGIN
              </Link>
            )}
            {showModal && selectedModal === 'UpdateFullName' && <UpdateFullNameModal currentUser={currentUser} onClose={toggleModal} />}
            {showModal && selectedModal === 'UpdateEmail' && <UpdateEmailModal currentUser={currentUser} onClose={toggleModal} />}
          </div>
        </div>
      </div>
    </nav>
  );
}