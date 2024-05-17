import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentOngoingMaintenance({ userId }) {
  const [ongoingMaintenance, setOngoingMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOngoingMaintenance = async () => {
      try {
        const response = await axios.get(`http://faculty-maintenance-system-api.vercel.app/api/maintenanceRequest/ongoingMaintenance/${userId}`);
        setOngoingMaintenance(response.data.ongoingMaintenance);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching ongoing maintenance');
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingMaintenance();
  }, [userId]);

  return (
    <div className='main-container'>

      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ongoingMaintenance.map((task, index) => (
              <tr key={index}>
                <td>{task.description}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentOngoingMaintenance;
