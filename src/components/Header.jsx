import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';


function Header() {
  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
  const navigate=useNavigate()
  const logOut=async=>{
    if(sessionStorage.getItem('token')){
      sessionStorage.removeItem('token')
    }
    if(sessionStorage.getItem('existigUser')){
      sessionStorage.removeItem('existingUser')
    }
    setIsAuthToken(false)
    navigate('/')
    
  }
  return (
   
       
    <>
      <Navbar className="bg-success">
        <Container>
         <Link to={'/'}style={{textDecoration:'none'}}> <Navbar.Brand >
           
           <i className="fa-brands fa-stack-overflow me-2 fs-3 text-warning "></i> <span style={{color:'white'}}>PROJECT FAIR</span>
          </Navbar.Brand></Link>
          {isAuthToken? <button className='btn btn-warning'> <i class="fa-solid fa-right-from-bracket"></i> LOG OUT</button>:
          <Link to={'/login'}>
           <button className='btn btn-warning'onClick={logOut}> <i class="fa-solid fa-right-from-bracket"></i> LOGIN</button>
          </Link>
          }
         
        </Container>
      </Navbar>
    </>
  )
}

export default Header
