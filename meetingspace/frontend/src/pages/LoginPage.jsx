import React, { useState } from 'react';
import axios from 'axios';
import { signIn } from '../Utilities';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      console.log(user);
      console.log('Email:', email); // Check the email value
      console.log('Password:', password); // Check the password value
      if (user) {
        setMessage('Login successful!');
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
    }
  };
    
  return (
    <div className="login-page">
      <h1>LogIn</h1>
      <form onSubmit={handleLogin}>
        <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <input type="password"
         placeholder="enter password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
         />
        <button type="submit">Log In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

 

export default LoginPage;
