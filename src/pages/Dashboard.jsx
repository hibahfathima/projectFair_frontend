import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'

function Dashboard() {
  const [name,setName]=useState("")
  useEffect(()=>{
          setName(JSON.parse(sessionStorage.getItem("existingUser")).name)
  },[])
  return (
    <>
      <div className="container-fluid">
        <h4 className='my-4 ms-4'>Welcome <span className='text-warning'>{name}</span></h4>
        <div className="row">
          <div className="col-md-8"> <Myproject/></div>
          <div className="col-md-4"> <Profile/> </div>
        </div>
       </div>

    </>
  )
}

export default Dashboard
