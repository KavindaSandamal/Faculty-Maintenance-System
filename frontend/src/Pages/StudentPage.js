import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import ProfileEditModal from './ProfileEditModal';
import MaintenanceRequests from './MaintenanceRequests';
import StudentOngoingMaintenance from './StudentOngoingMaintenance';
import StudentNotifications from './StudentNotifications';

function StudentPage() {
  const location = useLocation();
  const userId = location.pathname.split('/').pop();
  const [activeTab, setActiveTab] = useState('maintenanceRequests');
  const [isOpen, setIsOpen] = useState(false); // State for modal visibility
  const [currentUser, setCurrentUser] = useState(null); // State for current user data

  useEffect(() => {
    // Simulating fetching current user data (replace with actual fetching logic)
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data); // Set current user data in state
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCurrentUser(); // Fetch current user data when component mounts
  }, [userId]);

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Dashboard</h3>
        </div>

        <ul className="list-unstyled components">
          <li>
            <Link to="/" style={{ color: 'black' }}>Home</Link>
          </li>
          <li>
            <Link onClick={toggleModal} style={{ color: 'black' }}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/#contact" style={{ color: 'black' }}>Contact</Link>
          </li>
        </ul>
      </nav>

      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-info"
              onClick={toggleSidebar}
            >
              <i className="bi bi-caret-left-square-fill"></i>
            </button>
            <button
              className="btn btn-dark d-inline-block d-lg-none ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-align-justify"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item active">
                  <span className="nav-link">Welcome to Student Dashboard</span>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="col-md-10 col-sm-11 display-table-cell v-align">
          <div className="user-dashboard">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'maintenanceRequests' ? 'active' : ''}`}
                  onClick={() => setActiveTab('maintenanceRequests')}
                >
                  Maintenance Requests
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'ongoingMaintenance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ongoingMaintenance')}
                >
                  Ongoing Maintenance Requests
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  Notifications
                </button>
              </li>
            </ul>
            <div className="tab-content">
              {activeTab === 'maintenanceRequests' && (
                <div className="tab-pane fade show active">
                  <MaintenanceRequests userId={userId} />
                  <Link to={`/add-request/${userId}`}>
                    <button type="button" className="btn btn-secondary btn-lg">Add Request</button>
                  </Link>
                </div>
              )}
              {activeTab === 'ongoingMaintenance' && (
                <div className="tab-pane fade show active">
                  <StudentOngoingMaintenance userId={userId} />
                </div>
              )}
              {activeTab === 'notifications' && (
                <div className="tab-pane fade show active">
                  <StudentNotifications userId={userId} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {currentUser && (
        <ProfileEditModal isOpen={isOpen} toggleModal={toggleModal} userId={userId} currentUser={currentUser} />
      )}
    </div>
  );
}

export default StudentPage;
