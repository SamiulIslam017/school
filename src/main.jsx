import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import AuthProvider from './Provider/AuthProvider';
import router from './Routers/Router';
import {
  RouterProvider,
} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>

      <RouterProvider router={router}></RouterProvider>

    </AuthProvider>
  </React.StrictMode>,
)
