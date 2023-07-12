import { Card, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';
import React, { useState } from 'react';
import Cookies from 'js-cookie'
import dodLogo from '../Images/DODLogo.jpeg';


export default function UserLogin() {
  const Navigate = useNavigate();
  const [id, setUserId] = useState(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const signIn = async () => {
    try {
      const response = await fetch('http://localhost:8080/login/validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json()

        Cookies.set('token', data.token);
        Cookies.set('id', data.id);
        Navigate(`/users/userAccount/${data.id}`);
      } else {
        setToken(true);
        setUserId('');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-lg flex flex-col items-center">
        <img src={dodLogo} alt="DODLogo" className="w-48 h-auto mx-auto mb-4" />
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to the DOD Evaluation System!
        </h2>
        {token && <p>User Authentication Failed</p>}
        <input placeholder="Email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={() => signIn()}>Login</Button>
        <div className="flex">
          <p className="mr-2">Don't have an account?</p>
          <Link to="/login/createAccount" className="text-blue-800">
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
