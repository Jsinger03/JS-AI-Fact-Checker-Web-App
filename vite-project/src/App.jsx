import History from './History';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Register from './Register';
import Results from './Results';
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const API = import.meta.env.VITE_BACKEND_URL;


//https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
const apiCall = async () => {
  try{
    const response = await fetch(`${API}/api/queries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    });
  } catch (error) {
    console.error('There was an error fetching the data!', error);
  }
}

function App() {
  return (
    <Fragment>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard username="js"/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/results/:queryId" element={<Results />} />
      </Routes>
    </Router>
    </Fragment>
  );
}
export default App;