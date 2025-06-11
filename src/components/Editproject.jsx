import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_url } from '../services/base_url';
import { toast, ToastContainer } from 'react-toastify';
import { updateProjectApi } from '../services/allApi';
import { editProjectResponseContext } from '../context/ContextShare';


function Editproject({project}) {
  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
  console.log("edit project",project)
   const [projectDetails,setProjectDetails]=useState({
    id:project._id,
    title:project.title,
    language:project.language,
    gitHubLink:project.gitHub,
    websiteLink:project.website,
    overview:project.overview,
    projectImage:""
   })
  const [show, setShow] = useState(false);
  
    const handleClose = () =>{
       setShow(false);
       resetForm()
    }
    const handleShow = () => setShow(true)
    const [preview,setPreview]=useState()
    useEffect(()=>{
      if(projectDetails.projectImage){
        setPreview(URL.createObjectURL(projectDetails.projectImage))
      }
    },[projectDetails.projectImage])





    const handleUpdate=async()=>{
      const{id,title,language,gitHubLink,websiteLink,overview,projectImage}=projectDetails
      if(!title || !language || !gitHubLink || !websiteLink ||!overview ){
toast.warning("please provide complete details")
      }
      else{
        console.log("updated project details",projectDetails)
        //now we have to send the data in to the backend as form data since there is an image
        const requestBody=new FormData()
        requestBody.append("title",title)
         requestBody.append("language",language)
      requestBody.append("gitHubLink",gitHubLink)
      requestBody.append("websiteLink",websiteLink)
      requestBody.append("overview",overview)
      preview?requestBody.append("projectImage",projectImage):requestBody.append("projectImage",project.projectImage)
      const token=sessionStorage.getItem("token")

      if(preview){
        const reqHeder={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result=await updateProjectApi(id,requestBody,reqHeder)
        if(result.status===200){
           setShow(false)
          setEditProjectResponse(result.data)
          toast.success(`${title}updated successfully`)
         
        }
        else{
          toast.error("something went wrong")
        }
      }
      else{
         const reqHeder={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result=await updateProjectApi(id,requestBody,reqHeder)
       if(result.status===200){
         setShow(false)
        setEditProjectResponse(result.data)
          toast.success(`${title}updated successfully`)
        }
         else{
          toast.error("something went wrong")
        }
      }
     
      }
     
    }

    const resetForm=()=>{
      setProjectDetails({
         id:project._id,
    title:project.title,
    language:project.language,
    gitHubLink:project.gitHub,
    websiteLink:project.website,
    overview:project.overview,
    projectImage:""
      })
      setPreview("")
    }

    
  return (
    <>
           <i className="fa-solid fa-pen fs-4 text-warning ms-2" onClick={handleShow}></i>
           <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>EDIT PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="projectid">
                    <input type="file" id='projectid' style={{display:'none'}}onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                    <img src={ preview?preview: `${base_url}/uploads/${project.projectImage}`} alt="" className='w-75' style={{cursor:"pointer"}}/>
                  </label>
                </div>
                <div className="col-md-6">
                    <div>
                        <input type="text"placeholder='Project Title'className='form-control mt-2'value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                    </div>
                    <div>
                        <input type="text"placeholder='Technologies Used'className='form-control  mt-2' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
                    </div>
                    <div>
                        <input type="text"placeholder='GitHub Link'className='form-control  mt-2'value={projectDetails.gitHubLink}onChange={(e)=>setProjectDetails({...projectDetails,gitHub:e.target.value})} />
                    </div>
                    <div>
                        <input type="text"placeholder='Website Link'className='form-control  mt-2'value={projectDetails.websiteLink}onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />
                    </div>
                    <div className='mt-3'>
                        <textarea name="" id="" placeholder='Project overview' rows={4} className='form-control'value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>
                    </div>
                </div>
              </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>
           RESET
          </Button>
          <Button variant="success"  onClick={handleUpdate}>
           UPDATE
          
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>

    </>
  )
}

export default Editproject
