import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from '../Pages/maintainancerequests.moule.css'; // Corrected import path

function MaintenanceRequests() {
  const { Id } = useParams();
  const submittedBy = Id;
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/maintenanceRequests/${submittedBy}`);
        setMaintenanceRequests(response.data.existingMaintenanceRequests);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching maintenance requests');
      }
    };

    fetchMaintenanceRequests();
  }, [submittedBy]);

  return (
    <div className={classes.tableContainer}> {/* Corrected className */}
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <table className={`${classes.customTable} table table-dark table-striped`}> {/* Corrected interpolation */}
          <thead>
            <tr>
              <th>Place</th>
              <th>Issue Type</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.place}</td>
                <td>{request.issueType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MaintenanceRequests;
