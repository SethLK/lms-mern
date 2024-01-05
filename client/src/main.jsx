import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import { RouterProvider } from "react-router-dom";
import { UserProvider } from './myhooks/UserContent';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider >
      <RouterProvider router={Router} />
    </UserProvider>
  </React.StrictMode>,
)
