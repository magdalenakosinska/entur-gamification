import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './components/Authentication/Login/Login.tsx'
import Signup from './components/Authentication/Signup/Signup.tsx'
import AuthRoute from './components/Authentication/AuthRoute/AuthRoute.tsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Router>
      <Routes>
        <Route path="/" element={<AuthRoute><App /></AuthRoute>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  
  </StrictMode>,
)
