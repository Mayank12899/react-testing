// App.js
import React from 'react';
// Routing 
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import UserPage from './pages/UserPage';

import PrivateRouter from './router/PrivateRouter';
import BlogPage from './pages/BlogPage';
const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route exact path="/dashboard" element={<PrivateRouter />}>
            <Route path="/dashboard/app" element={<Dashboard />} />
            <Route path="/dashboard/user" element={<UserPage />} />
            <Route path="/dashboard/blogs" element={<BlogPage />} />
          </Route>
        </Routes>
      </Router>
  );
};

export default App;
