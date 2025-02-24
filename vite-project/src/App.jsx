import History from './History';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Register from './Register';
import Results from './Results';
import React, { Fragment, useEffect, useState } from 'react';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const API = import.meta.env.VITE_BACKEND_URL;


function App() {
  return (
    <Fragment>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/results/:queryId" element={<Results />} />
      </Routes>
    </Router>
    </Fragment>
  );
}
export default App;