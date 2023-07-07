import UserLogin from './components/LoginPage/login.js'
import React from 'react';
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route path='/users/:id' element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;



//  const router = createBrowserRouter(
//    createRoutesFromElements(
//     <Route path="/" element={<Layout />}  errorElement={<ErrorPage/>}>
//     <Route path="/createAccount" element={<CreateAccountPage />} />
//     <Route path="/login" element={<LoginPage />} />  
//     </Route>
//    )
//  );