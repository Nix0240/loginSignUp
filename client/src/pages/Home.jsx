import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome</h1>
      <p>This is the home page. Please login or sign up to continue.</p>
      <div className="home-buttons">
        <a href="/login" className="btn">Login</a>
        <a href="/signup" className="btn">Sign Up</a>
      </div>
    </div>
  );
};

export default Home;
