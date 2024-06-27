import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AllRequests from './AllRequests';
import OngoingMaintenance from './OngoingMaintenance';
import CompletedMaintenance from './CompletedMaintenance';
import ProfileEditModal from './ProfileEditModal';
import Reviews from './Reviews';

function StudentPage() {
  const [activeTab, setActiveTab] = useState('allmaintenanceRequests');
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {

    const fetchCurrentUser = async () => {
      try {

        const response = await fetch(`https://faculty-maintenance-system-api.vercel.app/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data); 
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCurrentUser(); 
  }, [userId]);

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
    } else {
      sidebar.classList.add('active');
    }
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
              <i className="fas fa-align-left"></i>
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
                  <a className="nav-link" href="#">
                    Welcome to Maintenance Division Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="col-md-10 col-sm-11 display-table-cell v-align">
          <div className="user-dashboard">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'allmaintenanceRequests' ? 'active' : ''}`}
                  onClick={() => setActiveTab('allmaintenanceRequests')}
                  href="#"
                >
                  Pending Maintenance Requests
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'ongoingMaintenance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ongoingMaintenance')}
                  href="#"
                >
                  Ongoing Maintenance Requests
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'completedMaintenance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('completedMaintenance')}
                  href="#"
                >
                  Completed Maintenance
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'Reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Reviews')}
                  href="#"
                >
                  Reviews
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {activeTab === 'allmaintenanceRequests' && (
                <div className="tab-pane fade show active">
                  <AllRequests />
                </div>
              )}
              {activeTab === 'ongoingMaintenance' && (
                <div className="tab-pane fade show active">
                  <OngoingMaintenance />
                </div>
              )}
              {activeTab === 'completedMaintenance' && (
                <div className="tab-pane fade show active">
                  <CompletedMaintenance />
                </div>
              )}
              {activeTab === 'Reviews' && (
                <div className="tab-pane fade show active">
                  <Reviews />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {currentUser && (
        <ProfileEditModal isOpen={isOpen} toggleModal={toggleModal} userId={userId} currentUser={currentUser} />
      )}
    </div>
  );
}

export default StudentPage;
