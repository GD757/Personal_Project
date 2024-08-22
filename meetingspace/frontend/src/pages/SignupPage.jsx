import React, { useState } from 'react';
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

  return (
    <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border max-w-md w-full">
        <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
          <h5>Sign Up for a New Account</h5>
        </div>
        <div className="flex-auto p-6">
          <form role="form text-left" onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <input
                aria-describedby="email-addon"
                aria-label="Email"
                placeholder="Email"
                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                aria-describedby="password-addon"
                aria-label="Password"
                placeholder="Password"
                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button
                className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            {message && <p className="text-center mt-4 text-sm text-red-500">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
