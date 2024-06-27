import React, { useState, useEffect } from 'react';
import MaintenanceRequests from './MaintenanceRequests';
import StudentOngoingMaintenance from './StudentOngoingMaintenance';
import StudentNotifications from './StudentNotifications';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'bootstrap';
import './styles.css';

function AcademicStaffPage() {
  const location = useLocation();
  const userId = location.pathname.split('/').pop();
  const [activeTab, setActiveTab] = useState('maintenanceRequests');

  useEffect(() => {
    const collapsible = document.querySelectorAll('.collapse');
    collapsible.forEach(collapse => {
      new Collapse(collapse);
    });
  }, []);

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
    } else {
      sidebar.classList.add('active');
    }
  };

  return (
    
    <div  className="wrapper">
      <nav   id="sidebar">
        <div className="sidebar-header">
            <h3>Dashboard</h3>
        </div>

        <ul className="list-unstyled components">
          <li>
            <Link to="/" style={{ color: 'black' }}>Home</Link>
          </li>
          <li>
            <Link to="/calendar" style={{ color: 'black' }}>Calendar</Link>
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
            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-align-justify"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Welcome to Academic Staff Dashboard</a>
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
                    className={`nav-link ${activeTab === 'maintenanceRequests' ? 'active' : ''}`}
                    onClick={() => setActiveTab('maintenanceRequests')}
                    href="#"
                  >
                    Maintenance Requests
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
                    className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notifications')}
                    href="#"
                  >
                    Notifications
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                {activeTab === 'maintenanceRequests' && (
                  <div className="tab-pane fade show active">
                    <MaintenanceRequests userId={userId} />
                    <Link to={`/add-request/${userId}`}>
                      <button type="button" className="btn btn-secondary btn-lg" >Add Request</button>
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
    </div>
  );
}

export default AcademicStaffPage;
