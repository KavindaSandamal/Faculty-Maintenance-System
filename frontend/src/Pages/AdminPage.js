import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminPage() {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    axios.get('https://faculty-maintenance-system-api.vercel.app/api/admin/pending-requests')
      .then(res => {
        setPendingRequests(res.data.pendingRequests);
      })
      .catch(error => {
        console.error('Error:', error.response?.data?.error || error.message);
        toast.error('Error: ' + (error.response?.data?.error || error.message));
      });
  }, []);

  const handleApproval = (id, status) => {
    axios.post(`https://faculty-maintenance-system-api.vercel.app/api/admin/approve-request`, { id, status })
      .then(res => {
        if (res.data.success) {
          toast.success('Request processed successfully');
          setPendingRequests(pendingRequests.filter(request => request.id !== id));
        }
      })
      .catch(error => {
        console.error('Error:', error.response?.data?.error || error.message);
        toast.error('Error: ' + (error.response?.data?.error || error.message));
      });
  };

  return (
    <div className="container">
      <h2>Pending Registration Requests</h2>
      <ul>
        {pendingRequests.map(request => (
          <li key={request.id}>
            <p>Name: {request.fullName}</p>
            <p>Email: {request.email}</p>
            <p>Role: {request.role}</p>
            <p>Department: {request.department}</p>
            <button onClick={() => handleApproval(request.id, 'approved')}>Approve</button>
            <button onClick={() => handleApproval(request.id, 'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
