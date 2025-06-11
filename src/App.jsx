
import React, { useContext } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Project from './pages/Project'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { isAuthTokenContext } from './context/ContextShare'

function App() {
  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
  return (
    <>

    <Header/>
    <Routes>
    < Route path='/' element={<Home/>}/>
    < Route path='/login' element={<Auth/>}/>
    < Route path='/register' element={<Auth registerpage={'registerpage'}/>}/>
    < Route path='/dashboard' element={isAuthToken? <Dashboard/>:<Home/>}/>
    < Route path='/project' element={<Project/>}/>
   
    </Routes>
   
    <Footer/>
    <ToastContainer autoClose={1000}/>
    </>
  )
}

export default App

