import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { signUp } from '../Utilities';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(email, password);
      if (user) {
        setMessage('Signup successful!');
      }
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  
  

  // const SignUp = async() => {
  //    let response = await axios.get("http://127.0.0.1:8000/api/signup")
  //     console.log(response.data)
  // }
     
  return (
    <div className="signup-page">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
        />
        <input type="password"
         placeholder="Password" 
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required 
         />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignupPage;
