import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Chat from './pages/chat/Chat';
import UserProvider from './components/user-provider';
import Default from './pages/chat/Default';
import SocketProvider from './components/socket-provider';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <UserProvider>
            <SocketProvider>
              <Default />
            </SocketProvider>
          </UserProvider>
          }/>
        <Route path='/chat/:userId' element={
          <UserProvider>
            <SocketProvider>
              <Chat />
            </SocketProvider>
          </UserProvider>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
