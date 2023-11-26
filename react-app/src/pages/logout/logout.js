import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './logout.css'; // Import the CSS file

const Logout = () => {
  const [message, setMessage] = useState('Logging out...');
  const navigate = useNavigate();

  useEffect(() => {
    // Make an API request to log the user out
    axios.get(`${process.env.REACT_APP_API}/logout`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setMessage('You have been logged out.');
          // Use navigate to redirect to the home page after a brief delay
          setTimeout(() => {
            navigate('/'); // Navigate to the home page
          }, 2000); // Redirect after 2 seconds (2000 milliseconds)
        } else {
          setMessage('Logout failed');
        }
      })
      .catch((error) => {
        setMessage('Logout failed. Please try again.');
      });
  }, [navigate]);
  

  return (
    <div className="logout-container">
      <h1 className="logout-title">Logout</h1>
      <p className="logout-message">{message}</p>
      <div className="button-container">
        <button className="logout-button">Back to Home</button>
      </div>
    </div>
  );
};

export default Logout;
