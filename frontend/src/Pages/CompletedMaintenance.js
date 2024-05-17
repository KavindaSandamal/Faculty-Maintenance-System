import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CompletedMaintenance() {
  const [completedMaintenance, setCompletedMaintenance] = useState([]);
  const [completedDates, setCompletedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedMaintenance = async () => {
      try {
        const response = await axios.get('http://faculty-maintenance-system-api.vercel.app/maintenanceRequests');
        const completedMaintenance = response.data.existingMaintenanceRequests.filter(
          task => task.status === 'Completed'
        );
        setCompletedMaintenance(completedMaintenance);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching maintenance requests');
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedMaintenance();
  }, []);

  useEffect(() => {
    const fetchCompletedDate = async () => {
      try {
        const completedDates = [];
        for (const maintenance of completedMaintenance) {
          const response = await axios.get(`http://faculty-maintenance-system-api.vercel.app/notifications`);
          const filteredNotifications = response.data.existingNotifications.filter(
            notification => notification.maintenanceId === maintenance._id
          );
          console.log(filteredNotifications);
          completedDates.push(filteredNotifications);
        }
        setCompletedDates(completedDates);
        // Log notifications
        completedDates.forEach((existingNotifications) => {
          console.log(existingNotifications);
        });
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching notifications');
      } finally {
        setLoading(false);
      }
    };
  
    if (completedMaintenance.length > 0) {
      fetchCompletedDate();
    }
  }, [completedMaintenance]);

  const completeDays = (createdAt) => {
    const dayCompleted = new Date(createdAt);
    return dayCompleted.toDateString(); // Convert date to string for display
  };

  return (
    <div className="main-container">
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th>Completed At</th>
            </tr>
          </thead>
          <tbody>
            {completedMaintenance.map((task, index) => (
              <tr key={index}>
                <td>{task.description}</td>
                <td>
                  {/* Rendering completed date for each maintenance task */}
                  {completedDates[index] && completedDates[index].map((filteredNotification, notificationIndex) => (
                    <div key={notificationIndex}>
                      <span style={{ color: 'green' }}>{completeDays(filteredNotification.createdAt)}</span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompletedMaintenance;
