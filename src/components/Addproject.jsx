import React, { useContext, useEffect } from 'react'
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApi';
import { Toast } from 'react-bootstrap';
import { addProjectResponseContext } from '../context/ContextShare';


function Addproject() {
  const [projectDetails,setProjectDetails]=useState({
    title:"",
    language:"",
    gitHubLink:"",
    websiteLink:"",
    overview:"",
    projectImage:""
  })
  const [preview,setPreview]=useState('')
  const[token,setToken]=useState('')
  //imported state created inside context api
  //useContext() hook is used to access context api
  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext) //step 1


  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
  },[])

  useEffect(()=>{
         if(projectDetails.projectImage){
          setPreview(URL.createObjectURL(projectDetails.projectImage))
         }
  },[projectDetails.projectImage])


  const handleClear=()=>{
    setProjectDetails({
       title:"",
    language:"",
    gitHubLink:"",
    websiteLink:"",
    overview:"",
    projectImage:""

    })
    setPreview("")
  }

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  const addProject=async()=>{
    console.log("project detaila",projectDetails)
    const {title , language ,gitHubLink , websiteLink , projectImage,overview}=projectDetails
    if(!title || !language || !gitHubLink || !websiteLink || !projectImage ||!overview){
    
      toast.warning("insufficient values")
    }
    else{
      //send data to backend
      //here we have to send a file(image),so instead of sending as object we are sending data as "form data"
      const reqBody=new FormData();
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("gitHubLink",gitHubLink)
      reqBody.append("websiteLink",websiteLink)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

       const reqHeder={
      "content-type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
   const result=await addProjectApi(reqBody,reqHeder)
   if(result.status===201){
    setAddProjectResponse(result.data)//as part of context api//step 2
    console.log(result)
    toast.success(result.data)
    handleClear()
    handleClose()


    
   }
   else if(result.status===406){
    toast.warning("project already exist, please add a new project")
   }
   else{
    toast.error("something went wrong")
   }
    }
    
    
  }
  return (
    <>
   
   <div>
    <button className='btn btn-success'onClick={handleShow}>ADD PROJECT</button>
   </div>
   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>ADD NEW PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="projectid">
                    <input type="file"id='projectid' style={{display:'none'}}onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                    <img src={preview?preview:'https://cdn-icons-png.flaticon.com/512/126/126477.png'} alt="" className='w-75' style={{cursor:"pointer"}}/>
                   
                  </label>
                </div>
                <div className="col-md-6">
                    <div>
                        <input type="text"placeholder='Project Title'className='form-control mt-2' onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} value={projectDetails.title} />
                    </div>
                    <div>
                        <input type="text"placeholder='Technologies Used'className='form-control  mt-2'onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} value={projectDetails.language}/>
                    </div>
                    <div>
                        <input type="text"placeholder='GitHub Link'className='form-control  mt-2' onChange={(e)=>setProjectDetails({...projectDetails,gitHubLink:e.target.value})} value={projectDetails.gitHubLink}/>
                    </div>
                    <div>
                        <input type="text"placeholder='Website Link'className='form-control  mt-2'onChange={(e)=>setProjectDetails({...projectDetails,websiteLink:e.target.value})}value={projectDetails.websiteLink} />
                    </div>
                    <div className='mt-3'>
                        <textarea name="" id="" placeholder='Project overview' rows={4} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} value={projectDetails.overview}></textarea>
                    </div>
                </div>
              </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
           CLEAR
          </Button>
          <Button variant="success" onClick={addProject}>
            ADD PROJECT
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  )
}

export default Addproject
