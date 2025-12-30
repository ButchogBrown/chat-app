import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Chat from './pages/chat/Chat';
import Default from './pages/chat/Default';
import AuthRoute from './components/AuthRoute';

function App() {

  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <AuthRoute>
            <Default />
          </AuthRoute>
        }/>
        <Route path='/chat/:userId' element={
          <AuthRoute>
            <Chat />
          </AuthRoute>
          
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
