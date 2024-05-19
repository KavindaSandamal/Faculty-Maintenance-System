import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      const allUsers = response.data.existingUsers;
      const inactiveRequests = allUsers.filter(user => user.status === 'inactive');
      setRequests(inactiveRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Error fetching requests');
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(`http://localhost:8000/user/approve/${userId}`);
      fetchRequests();
    } catch (error) {
      console.error('Error approving request:', error);
      setError('Error approving request');
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/user/delete/${userId}`);
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
      setError('Error rejecting request');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center py-3">
        <h2 className="h5 mb-0"><a href="#" className="text-muted"></a> Admin Dashboard</h2>
      </div>
      {requests.map(request => (
        <div className="row">
          <div className="col-lg-8">
            <div key={request._id} className="card mb-4">
              <div className="card-body">
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    <span className="me-3">User Details</span>
                  </div>
                </div>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex mb-2">
                          <div className="flex-lg-grow-1 ms-3">
                            <h6 className="small mb-0">Name</h6>
                          </div>
                        </div>
                      </td>
                      <td className="text-end"> {request.fullName}</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex mb-2">
                          <div className="flex-lg-grow-1 ms-3">
                            <h6 className="small mb-0">Email</h6>
                          </div>
                        </div>
                      </td>
                      <td className="text-end" >{request.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex mb-2">
                          <div className="flex-lg-grow-1 ms-3">
                            <h6 className="small mb-0">UserName</h6>
                          </div>
                        </div>
                      </td>
                      <td  className="text-end">{request.regNo}</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex mb-2">
                          <div className="flex-lg-grow-1 ms-3">
                            <h6 className="small mb-0">Contact Number</h6>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">{request.contactNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h6">Status</h3>
                <p>{request.status}</p>
                {request.status === 'inactive' && (
                  <div>
                    <button className="btn btn-secondary btn-sm" onClick={() => handleApprove(request._id)}>Approve</button>
                    <button className="btn btn-secondary btn-sm" style={{ marginLeft: '10px' }} onClick={() => handleReject(request._id)}>Reject</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;