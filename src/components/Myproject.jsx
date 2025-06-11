import React, { useContext, useEffect } from 'react'
import Addproject from './Addproject'
import { Link } from 'react-router-dom'
import Editproject from './Editproject'
import { deleteProjectApi, getUserProjectApi } from '../services/allApi'
import { useState } from 'react'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Myproject() {
  const [userProject,setUserProject]=useState()
  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)//as part of context api//step 3
  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
  const getUserProjects=async()=>{
    const token=sessionStorage.getItem('token')
    const requestHeader={
      "content-type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result=await getUserProjectApi(requestHeader)
    console.log("the userdata are",result.data)
    setUserProject(result.data)
  }

  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])//as part of context api//step 4

  const handleDelete=async(projectid)=>{
const token=sessionStorage.getItem("token")
const reqHeader={
  "Content-Type":"application/json",
  "Authorization":`Bearer ${token}`
}
const result= await deleteProjectApi(projectid,reqHeader)
if(result.status===201){
  toast.success(`${result.data.title} deleted successfully` )
getUserProjects()
}else{
  toast.error("something went wrong")
}
  }

 
  return (
    <>
    <div className='shadow p-5 mb-5'>
        <div className='d-flex justify-content-between'>
            <h5 className='text-success me-auto'>PROJECTS</h5>
            <Addproject/>
        </div>
        {
        userProject?.length>0?
        userProject.map((items)=>(
<div className='d-flex justify-content-between p-3 m-3 rounded'style={{backgroundColor:'lightgrey'}}>
            <h6 className='fs-5'>{items.title}</h6>
            <div>
                <Link to={items.gitHub} target='_blank' style={{textDecoration:'none'}}><i class="fa-brands fa-github me-2 fs-4 text-success"></i></Link>
               <Link to={items.website} target='_blank' style={{textDecoration:'none'}}> <i class="fa-solid fa-link fs-4 text-success"></i></Link>
                <Link style={{textDecoration:'none'}}> <i class="fa-solid fa-trash fs-4 text-danger"onClick={()=>handleDelete(items._id)}></i></Link>
               <Editproject project={items}/>
            </div>
        </div>
        )):
        <p>NO PROJECTS UPLOADED YET</p>
        }
        
    </div>

   <ToastContainer/>
    </>
  )
}

export default Myproject
