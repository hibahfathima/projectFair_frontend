import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectApi } from '../services/allApi'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Project() {
  const [allProject,setAllProject]=useState('')
  const [searchKey,setSearchKey]=useState("")
  const [isToken,setIsToken]=useState(false)

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setIsToken(true)
    }
  },[])

  const getAllProject=async()=>{
    if(sessionStorage.getItem('token')){
      const token=sessionStorage.getItem('token')
      const header={
        "content-type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result=await getAllProjectApi(searchKey,header)
      console.log("all project",result)
      setAllProject(result.data)
    }
  }
  useEffect(()=>{
    getAllProject()
  },[searchKey])
  return (
    <>
    {
      isToken? 
      <div>
      <div className="container-fluid">
      <h3 className='text-center m-5 text-warning'>EPLORE PROJECTS</h3>

    </div>
    <div className="container-fluid">
      <Row className='my-5'>
        <Col md={4}>
        </Col>
        <Col md={4} className='d-flex'>
        <input type="text" className='form-control' placeholder='Search by Technologies' onChange={(e)=>setSearchKey(e.target.value)} />
        <i class="fa-solid fa-magnifying-glass text-warning" style={{marginLeft:"-30px",marginTop:'10px'}}></i>
        </Col>
        <Col md={4} ></Col>
      </Row>
    </div>
    <div className='row my-5'>
      {
        allProject.length>0? 
        allProject.map((items)=>(
 <div className='col-md-4 p-3'>
           <ProjectCard projectData={items}/>

           </div>
        )):
        <p>No Project found</p>
      }
          
    </div>
    </div>:
    <div className='m-5'>
    <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?semt=ais_hybrid&w=740" height={'400px'} />
    <p>
      <Link to={'/login'}style={{textDecoration:"none"}}>LOGIN</Link> to view more projects
    </p>
    </div>
    
    }
   
    </>
  )
}

export default Project
