import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentNotifications({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`https://faculty-maintenance-system-api.vercel.app/api/notifications/${userId}`);
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

  const handleAddReviewClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setReview('');
  };

  const handleSaveReview = async () => {
    try {
      const response = await axios.post('https://faculty-maintenance-system-api.vercel.app/api/reviews', {
        userId,
        notificationId: selectedNotification._id,
        message: review
      });
      console.log('Review submitted:', response.data);
      toast.success('Feedbck Send Successfully');
      handleClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

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
                <th>Button</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{notification.message}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                      onClick={() => handleAddReviewClick(notification)}
                    >
                      Add Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No notifications to display</p>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="reviewText">
              <Form.Label>Review</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveReview}>
            Send Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StudentNotifications;
