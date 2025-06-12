import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, } from 'react-bootstrap'
import projectImage from '../assets/image1.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProjectsApi } from '../services/allApi'
import { isAuthTokenContext } from '../context/ContextShare'

function Home() {
   
    const [homeProjects,setHomeProjects]=useState([])
    const { isAuthToken } = useContext(isAuthTokenContext)
    
   
    
    const getHomeProject=async()=>{
        const result=await getHomeProjectsApi()
        console.log("hoem projects ",result)
        setHomeProjects(result.data)
    }
 
    return (
        <>
            <div className='container-fluid p-5 ' style={{ height: '100vh', width: '100%', backgroundColor: '#3cb371', color: 'white' }}>
                <Row>
                    <Col md={6} lg={6} className="d-flex justify-content-center align-items-center">
                        <div>
                            <h3>PROJECT FAIR</h3>
                            <h6>One Stop destination for all S/W Projects</h6>
                            {
  !isAuthToken ?
  <Link to={'/login'} > <button className='btn btn-success p-1'>Get Started <i className="fa-solid fa-arrow-right ms-1"></i></button></Link> :
  <Link to={'/dashboard'} > <button className='btn btn-success p-1'>MANAGE PROJECTS <i className="fa-solid fa-arrow-right ms-1"></i></button></Link>
}

                        </div>
                    </Col>
                    <Col md={6} lg={6} className='mt-5'>
                        <img src={projectImage} alt="" width={'75%'} />
                    </Col>
                </Row>



            </div>

            <div className="container-fluid">
                <h3 className='text-center my-5'>    EXPLORE YOIR PROJECTS</h3>
                <div className="row mb-5 ">
                 
                 <marquee behavior="" direction=""scrollAmount={10}>
                    <div className="row">
  {
                        homeProjects?.length>0&& 
                        homeProjects.map((items)=>(
                             <div className="col-md-4 col-lg-4 d-flex justify-content-center p-4">
                        <ProjectCard projectData={items}/>
                       
                    </div>
                        ))
                    }
                    </div>

                  
             
                 </marquee>
                  
                 <Link to={'/project'}style={{textDecoration:'none'}}> <h5 className='text-center text-warning my-5 fw-bold'>See more Projects</h5></Link>
                </div>

            </div>

        </>



    )
}

export default Home
