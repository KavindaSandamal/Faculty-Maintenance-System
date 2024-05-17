import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests with inactive status from the backend upon component mounting
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('https://faculty-maintenance-system-api.vercel.app/api/users');
      const allUsers = response.data.existingUsers;
      const inactiveRequests = allUsers.filter(user => user.status === 'inactive');
      setRequests(inactiveRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(`https://faculty-maintenance-system-api.vercel.app/api/user/approve/${userId}`);
      // Refresh the requests list after approving
      fetchRequests();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.delete(`https://faculty-maintenance-system-api.vercel.app/api/user/delete/${userId}`);
      // Refresh the requests list after rejecting
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className='main-container'>
      <h1>Admin Page</h1>
      <div className='requests-list'>
        {requests.map(request => (
          <div key={request._id} className='request-item'>
            <p>{request.fullName}</p>
            <p>{request.email}</p>
            <p>{request.regNo}</p>
            <p>{request.contactNumber}</p>
            <p>Status: {request.status}</p>
            {request.status === 'inactive' && (
              <div>
                <button onClick={() => handleApprove(request._id)}>Approve</button>
                <button onClick={() => handleReject(request._id)}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
