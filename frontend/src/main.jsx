import React,{ StrictMode } from 'react'
import  { createRoot } from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Admin from './admin/Admin.jsx';
import HomePage from './viewer/HomePage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  {
    path: '/admin',
    element: <Admin />,
  }

])    


createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router} />
  </StrictMode>,
)
