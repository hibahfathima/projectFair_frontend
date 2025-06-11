import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './theme.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './context/ContextShare.jsx'

createRoot(document.getElementById('root')).render(
  //to implement context api ,we have to enclose app comp inside Context share
   <ContextShare>
     <BrowserRouter>
      <App />
    </BrowserRouter>
   </ContextShare>
  
)
