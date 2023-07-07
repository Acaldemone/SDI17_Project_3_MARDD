import {Link} from 'react-router-dom';
import '../../index.css'
import React, {useState} from 'react';



export default function UserLogin(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    <p>Welcome to the DOD Evaluation System!</p>
    </h2>
    <input placeholder='Email' value={email} />
    <input placeholder='Password' value={password}/>
    <Link to='/users'>
    <button>Login</button>
    </Link>
    <Link to='/login/createAccount'>
    <p>Create Account</p>
    </Link>
    </div>
  )
}