import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider'
import { Socket } from 'socket.io-client'
import SocketProvider from './context/SocketProvider'
import OnlineUserProvider from './context/OnlineUserProvider'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <SocketProvider>
      <OnlineUserProvider>
        <App />
      </OnlineUserProvider>
    </SocketProvider>
  </AuthProvider>
    
  // </StrictMode>,
)
