import React, { useEffect } from 'react'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { toast, ToastContainer } from 'react-toastify';
import { updateProfileApi } from '../services/allApi';
import { base_url } from '../services/base_url';

function Profile() {
  const [open, setOpen] = useState(false);
  const [profile,setProfile]=useState({
   name:"",
   email:"",
   password:"",
   gitHub:"",
   linkedin:"",
   profileImage:""
  })
  const [token,setToken]=useState()
  const [preview,setPreview]=useState()
 

 useEffect(() => {
  if (profile.profileImage instanceof File) {
    const objectUrl = URL.createObjectURL(profile.profileImage);
    setPreview(objectUrl);

    // Cleanup: revoke the object URL when the component unmounts or image changes
    return () => URL.revokeObjectURL(objectUrl);
  }
}, [profile.profileImage]);


 
 
useEffect(() => {
  const storedData = JSON.parse(sessionStorage.getItem('existingUser'));
  if (storedData) {
    setProfile(prev => ({
      ...prev,
      name: storedData.name || '',
      email: storedData.email || '',
      password: storedData.password || '',
      gitHub: storedData.gitHub || '',
      linkedin: storedData.linkedin || '',
      profileImage: storedData.profileImage || ''
    }));

   
    if (storedData.profileImage) {
      setPreview(`${base_url}/uploads/${storedData.profileImage}`);
    }
  }
}, []);



useEffect(()=>{
  if(sessionStorage.getItem('token')){
    setToken(sessionStorage.getItem('token'))
  }
},[])

const updateProfile=async()=>{
  console.log("the updated value",profile)
  const reqBody=new FormData();
  reqBody.append('name',profile.name)
   reqBody.append('email',profile.email)
    reqBody.append('password',profile.password)
     reqBody.append('gitHub',profile.gitHub)
      reqBody.append('linkedin',profile.linkedin)
       reqBody.append('profileImage',profile.profileImage)
       console.log("the  req body is",reqBody)

       const reqHead={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
       }
       const result=await updateProfileApi(reqBody,reqHead)
       if(result.status===201){
        toast.success("profile successfully updated")
        setProfile(result.data)
         sessionStorage.setItem("existingUser", JSON.stringify(result.data))
        
       }
}
  return (
    <>
      <div className='shadow p-4 '>
        <div className='d-flex justify-content-between'>
          <h5>MY Profile</h5>
          <div><button className='btn btn-success mb-2'  onClick={() => setOpen(!open)}><i class="fa-solid fa-angle-up"></i></button>
          </div>
        </div>
        <Collapse in={open}>
       
     
  <div >
          <div className='d-flex justify-content-center'>
            <label htmlFor="profileimg">
              <input type="file" id='profileimg' style={{display:'none'}}
              onChange={(e)=>setProfile({...profile,profileImage:e.target.files[0]})}/>
              <img style={{borderRadius:'50%',cursor:'pointer'}} className='w-50 h-100' src={preview?preview:'https://cdn-icons-png.flaticon.com/512/126/126477.png'} alt="" />
            </label>
          </div>
          <div className='mt-3'>
            <input type="text" placeholder='GitHub link' className='form-control rounded border-0 ' 
             onChange={(e)=>setProfile({...profile,gitHub:e.target.value})} value={profile.gitHub}/>
          </div>
          <div className='mt-3'>
            <input type="text"placeholder='Linkedin Link'  className='form-control rounded border-0'
           onChange={(e)=>setProfile({...profile,linkedin:e.target.value})} value={profile.linkedin}/>
          </div>
          <div>
            <button className='btn btn-success w-100 mt-3'onClick={updateProfile}>UPDATE PROFILE</button>
          </div>
        </div>
         
       
      
      </Collapse>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Profile
