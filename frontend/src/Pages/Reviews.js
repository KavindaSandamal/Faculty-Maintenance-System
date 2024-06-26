import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Reviews() {
  const { notificationId, userId } = useParams();  // Assuming you have both params
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://faculty-maintenance-system-api.vercel.app/api/reviews`, {
          params: { notificationId, userId }  // Pass params to the query string
        });
        if (response.data && response.data.reviews) {
          setReviews(response.data.reviews);
        } else {
          setError('No reviews found');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [notificationId, userId]);  // Update dependency array

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : reviews && reviews.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Notification</th>
                <th>Feedback</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{review.userId?.fullName || 'Unknown User'}</td>
                  <td>{review.notificationId ? review.notificationId.message : 'Unknown Notification'}</td>
                  <td>{review.message}</td>
                  <td>{new Date(review.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedbacks to display</p>
      )}
    </div>
  );
}

export default Reviews;
