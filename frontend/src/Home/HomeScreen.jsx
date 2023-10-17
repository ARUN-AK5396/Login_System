import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomeScreenStyles.css'
function HomeScreen() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/home')
      .then((res) => {
        if (res.data.valid) {
          setUserData(res.data.userData);
        } else {
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
  }, );

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then((res) => {
        if (res.data.loggedOut) {
          navigate('/login');
          alert("Now you are logging out!! and Redirect to the Login page")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-container">
      <h1>Welcome {userData.name}</h1>
      <p>Email: {userData.email}</p>
      <p>Age: {userData.age}</p>
      <p>Mobile: {userData.mobile}</p>
      <p>Date of Birth: {userData.dob}</p>
      <p>Gender: {userData.gender}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomeScreen;
