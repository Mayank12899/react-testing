import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from '../components/global/Navbar';

const PrivateRoute = ({ component: component, ...rest }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log({ isLoggedIn })
    return isLoggedIn ? 
    (
      <div>
        <div className='bodyComponent' style={{ display: "flex" }}>
          <CssBaseline />
          <Navbar />
          <Outlet />
        </div>
      </div>
    )
       : 
    
    <Navigate to="/" />;
}

export default PrivateRoute;