
import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
    <div className="d-flex justify-content-evenly align-items-center bg-success mt-5"style={{height:'260px',width:'100%'}}>

    <div className="d-flex justify-content-evenly align-items-evenly "style={{gap:'70px'}}>
        <div className='overview'style={{width:'400px',color:'white'}}>
            <h4> <Link to={'./'} style={{textDecoration:'none',color:'white'}}> <i class="fa-brands fa-stack-overflow text-warning"></i> PROJECT FAIR</Link> </h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, omnis adipisci? Quidem doloremque ducimus porro reprehenderit, in aspernatur inventore sapiente beatae. Eum nisi adipisci id hic magni, laudantium nemo sapiente!</p>
        </div>
        <div style={{color:'white'}}>
            <h5><Link to={'/'} style={{color:'white',textDecoration:'none'}}>Home</Link></h5>
            <h5><Link to={'./whishlist'} style={{color:'white',textDecoration:'none'}}>Whishlist</Link></h5>
            <h5><Link to={'/cart'} style={{color:'white',textDecoration:'none'}}>Cart</Link></h5>
        </div>
    
        <div className='guides' style={{color:'white' }}>
            <h5>GUIDES</h5>
            REACT
            <br />
            REACT BOOTSRAP
            <br />
            FONT AWSOME
           </div>
        
    
    
           <div className='contactUs'style={{color:'white' }}>
           <h5>CONTACT US</h5>
            <div className='d-flex'>
            <input type="text" placeholder='Enter your email'className='form-control '/>
            <button className='btn btn-warning ms-1'>Subscribe</button>
            </div>
            <div className='d-flex justify-content-evenly align-items-center mt-3'><i class="fa-brands fa-instagram fa-2x "></i> <i class="fa-brands fa-twitter fa-2x"></i> <i class="fa-brands fa-facebook fa-2x"></i>  <i class="fa-brands fa-whatsapp fa-2x"></i></div>
        </div>
    </div>
      </div>
       </>
  )
}

export default Footer
