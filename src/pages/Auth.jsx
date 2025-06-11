import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Toast } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import image from '../assets/image2.png'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify'
import { isAuthTokenContext } from '../context/ContextShare'

function Auth({registerpage}) {
  const isRegisterPage=registerpage ? true:false;
  const navigate=useNavigate()
  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
  //crate a state to store values enterd by user
  const [userData,setUserData]=useState({
    name:'',
    email:'',
    password:''
  })
  const handleRegister=async()=>{
    console.log("userData")
    console.log(userData)

    const {name,email,password}=userData
    if(!name|| !email|| !password){
     toast.warning("plaese input all values !!")
    }
    else{
      //call api to register user
      const result=await registerApi(userData)
      console.log("result from registration",result)
      
      if (result.status===201){
        toast.success(`${userData.name} registered successfully`)
        setUserData({
          name:"",
          email:"",
          password:""
        })

        //if everything is success navigate to login component
        navigate('/login')

      }
      else if(result.status===409){
        toast.warning(`${userData.email} already exist ,please login`)
        
      }
      else{
toast.warning("Something went wrong")
      }
    }
  }
  const handleLogin=async()=>{
    console.log("inside handleLogin functions")
    const {email,password}=userData;
    console.log(email,password)
    if(!email||!password){
      toast.warning("please enter all values")
    }
    else{
      const result=await loginApi(userData)
      console.log("response from login",result.data)
     if(result.status===200){
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.user_data))
      sessionStorage.setItem("token",result.data.jwt_token)
      toast.success("Logged in successfully")
      setIsAuthToken(true)
      navigate('/')
     }
     else if(result.status===406){
      toast.error("Email or password mismatch")
     }
     else{
      toast.error("Something happened")
     }
    }
  }
  useEffect(()=>{
    setUserData({
      name:"",
      email:"",
      password:""
    })
  },[registerpage])
  return (
    <>
    <div className='container-fluid'>
      <h5 className=' fw-bold m-3'> <Link to={'/'} style={{textDecoration:'none'}}className='text-warning'><i class="fa-solid fa-arrow-left"></i>Back to Home</Link></h5>

    </div>
    <div className="container-fluid d-flex justify-content-center  py-5 bg-light" >
      <Row>
        <Col md={6} className='d-flex justify-content-center align-items-center'>
        <img src={image} alt=""width={'75%'} />
        </Col>
        <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
        <h4 className='text-center'> <i className="fa-brands fa-stack-overflow me-2 fs-3 text-warning "></i>Project Fair</h4>
        <br />
        {
              isRegisterPage?
              <h5 className='text-center '>SIGNUP TO YOUR ACCOUT</h5>:
              <h5 className='text-center '>SIGNIN  TO YOUR ACCOUT</h5>
        }
        
        <div className='w-100 d-flex justify-content-center align-items-center flex-column'>
       {
        isRegisterPage &&
        <input type="text" placeholder='ENTER NAME' value={userData.name} className='form-control w-75 rounded mt-3'onChange={(e)=>setUserData({...userData,name:e.target.value})}/>
       }
        <input type="text" placeholder='ENTER EMAIL' value={userData.email} className='form-control w-75 rounded mt-3' onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
        <input type="password" placeholder=" ENTER PASSWORD" value={userData.password} className='form-control w-75 rounded mt-3'onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
        {
          isRegisterPage?
          <button className=' btn btn-warning mt-3 w-75'onClick={handleRegister}> REGISTER </button>:
          <button className=' btn btn-warning mt-3 w-75'onClick={handleLogin}> LOG IN </button>
        }
        </div>
        <div>
         {
          isRegisterPage ?
         <Link to={'/login'} style={{textDecoration:"none"}}> <p className="mt-2">ALREADY A USER?<span style={{color:'blue'}}>LOGIN</span></p></Link>:
          <Link to={'/register'} style={{textDecoration:"none"}}><p className="mt-2">NEW USER?<span style={{color:'blue'}}>REGISTER</span></p></Link>
         }
        </div>

        </Col>
      </Row>
    </div>
   
    </>
  )
}

export default Auth
