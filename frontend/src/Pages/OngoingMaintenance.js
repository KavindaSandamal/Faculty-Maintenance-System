import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OngoingMaintenance() {
  const [ongoingMaintenance, setOngoingMaintenance] = useState([]);
  const [updatedDates, setUpdatedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedBoxes, setCheckedBoxes] = useState(() => {
    const storedCheckedBoxes = localStorage.getItem('checkedBoxes');
    return storedCheckedBoxes ? JSON.parse(storedCheckedBoxes) : {};
  });

  useEffect(() => {
    const fetchOngoingMaintenance = async () => {
      try {
        const response = await axios.get('https://faculty-maintenance-system-api.vercel.app/api/maintenanceRequests');
        const inProgressMaintenance = response.data.existingMaintenanceRequests.filter(
          task => task.status === 'In Progress'
        );
        setOngoingMaintenance(inProgressMaintenance);
        console.log(inProgressMaintenance);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching maintenance requests');
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingMaintenance();
  }, []);

  useEffect(() => {
    const fetchUpdatedDate = async () => {
      try {
        const updatedDates = [];
        for (const maintenance of ongoingMaintenance) {
          const response = await axios.get(`https://faculty-maintenance-system-api.vercel.app/api/notifications`);
          const filteredNotifications = response.data.existingNotifications.filter(
            notification => notification.maintenanceId === maintenance._id
          );
          console.log(filteredNotifications);
          updatedDates.push(filteredNotifications);
        }
        setUpdatedDates(updatedDates);
        // Log notifications
        updatedDates.forEach((existingNotifications) => {
          console.log(existingNotifications);
        });
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching notifications');
      } finally {
        setLoading(false);
      }
    };

    if (ongoingMaintenance.length > 0) {
      fetchUpdatedDate();
    }
  }, [ongoingMaintenance]);

  useEffect(() => {
    localStorage.setItem('checkedBoxes', JSON.stringify(checkedBoxes));
  }, [checkedBoxes]);

  const calculatePendingDays = (createdAt) => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    const differenceInTime = createdDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const handleProgressChange = async (id, index, newProgress) => {
    const updatedMaintenance = [...ongoingMaintenance];
    updatedMaintenance[index].progress = newProgress;

    if (newProgress === 'Completed') {
      updatedMaintenance[index].status = 'Completed';
      try {
        await axios.post(`https://faculty-maintenance-system-api.vercel.app/api/maintenanceRequest/${id}/completed`, {
          status: 'Completed'
        });

        // Send a notification when the task is completed
        await axios.post('https://faculty-maintenance-system-api.vercel.app/api/sendNotification', {
          userId: updatedMaintenance[index].submittedBy,
          maintenanceId: updatedMaintenance[index]._id,
          message: `Your maintenance request for "${updatedMaintenance[index].description}" has been completed.`
        });

      } catch (error) {
        console.error('Error updating maintenance request status:', error);
      }
    }

    setOngoingMaintenance(updatedMaintenance);
    updateCheckedBoxes(index, newProgress);
  };

  const updateCheckedBoxes = (index, newProgress) => {
    setCheckedBoxes(prevState => ({
      ...prevState,
      [index]: newProgress
    }));
  };

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {ongoingMaintenance.map((task, index) => (
            <tr key={index}>
              <td>{task.description}</td>
              <td>
                {/* Displaying pending days for each maintenance task */}
                {updatedDates[index] && updatedDates[index].map((filteredNotification, notificationIndex) => (
                  <div key={notificationIndex}>
                    In the process for <span style={{ color: 'green' }}>{calculatePendingDays(filteredNotification.createdAt)}</span> Days
                  </div>
                ))}
              </td>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id={`beginning_${index}`}
                    checked={checkedBoxes[index] === "Begining"}
                    onChange={() => handleProgressChange(task._id, index, checkedBoxes[index] === "Begining" ? "" : "Begining")}
                  />
                  <label htmlFor={`beginning_${index}`} style={{ color: 'red' }}>Begining </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id={`finishing_${index}`}
                    checked={checkedBoxes[index] === "Finishing"}
                    onChange={() => handleProgressChange(task._id, index, checkedBoxes[index] === "Finishing" ? "" : "Finishing")}
                  />
                  <label htmlFor={`finishing_${index}`} style={{ color: 'yellow' }}>Finishing</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id={`completed_${index}`}
                    checked={checkedBoxes[index] === "Completed"}
                    onChange={() => handleProgressChange(task._id, index, checkedBoxes[index] === "Completed" ? "" : "Completed")}
                  />
                  <label htmlFor={`completed_${index}`} style={{ color: 'green' }}>Completed</label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OngoingMaintenance;
