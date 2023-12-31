import UserLogin from './components/LoginPage/login.js'
import CreateAccountPage from './components/CreateAccountPage/createAccount.js'
import UserPage from './components/UserAccountPage/UserPage.js'
import React, {useState} from 'react';
import './index.css'
import {Routes, Route } from 'react-router-dom'

function App() {
  const [UserId, setUserId] = useState()
  return (
    <div className="bg-blue-50">
      <Routes>
        <Route path='/' element={<UserLogin setUserId={setUserId} />} />
        <Route path='/login/createAccount' element={<CreateAccountPage />} />
        <Route path='/users/userAccount/:id/*' element={<UserPage userId={UserId} />} />
      </Routes>
    </div>
  );
}

export default App;
