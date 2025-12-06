import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Chat from './pages/chat/Chat';
import UserProvider from './components/user-provider';
import Default from './pages/chat/Default';
import SocketProvider from './components/socket-provider';
import AuthProvider from './context/AuthProvider';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <AuthProvider>
            <SocketProvider>
              <Default />
            </SocketProvider>
          </AuthProvider>
          }/>
        <Route path='/chat/:userId' element={
          <AuthProvider>
            <SocketProvider>
              <Chat />
            </SocketProvider>
          </AuthProvider>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
