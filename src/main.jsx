import React from 'react'
import {app, store} from "./Databaseconfigaration/Firebaseconnect.js"
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
