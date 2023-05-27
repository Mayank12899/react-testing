// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/global/Navbar'
const Dashboard = () => {
  // const userEmail = useSelector((state) => state.auth.email);
  const [userEmail, setuserEmail] = useState('');
  useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if(isLoggedIn){
          const user = localStorage.getItem("email")
          setuserEmail(user)
      }else{
          window.location.href="/"
      }
  },[])
  return (
    <div style={{padding: "8%"}}>
      <h2>Dashboard</h2>
      <p>Welcome, {userEmail}!</p>
    </div>
  );
};

export default Dashboard;
