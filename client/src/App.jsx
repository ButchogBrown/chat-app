import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Chat from './pages/chat/Chat';
import UserProvider from './components/user-provider';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path='/chat' element={
          <UserProvider>
            <Chat />
          </UserProvider>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
