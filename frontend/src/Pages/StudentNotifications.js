import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentNotifications({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://faculty-maintenance-system-api.vercel.app/notifications/${userId}`);
        // Assuming notifications are returned in response.data
        if (response.data && response.data.notifications) {
          setNotifications(response.data.notifications);
        } else {
          setError('No notifications found');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    console.log('Notifications:', notifications);
  }, [notifications]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : notifications && notifications.length > 0 ? (
        <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{notification.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p>No notifications to display</p>
      )}
    </div>
  );
  
}

export default StudentNotifications;
