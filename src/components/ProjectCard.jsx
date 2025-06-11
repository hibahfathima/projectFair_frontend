import React from 'react'

import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import pimage from '../assets/mediaplayer.png'
import { Link } from 'react-router-dom';
import { base_url } from '../services/base_url';

function ProjectCard({projectData}) {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
<>
<Card style={{ width: '18rem' }} className='m-5 shadow rounded-0 border-0'>
      <Card.Img variant="top" src={`${base_url}/uploads/${projectData.projectImage}`} height={"200px"} className="p-2"/>
      <Card.Body>
        <Card.Title>{projectData.title}</Card.Title>
        <Card.Text>
         
        </Card.Text>
        <Button variant="success"onClick={handleShow}>Project Details</Button>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{projectData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body><Row>
            <Col md={6} lg={6}>
            <img src={`${base_url}/uploads/${projectData.projectImage}`} alt="" width={'100%'}/>
            </Col>
            <Col  md={6} lg={6}>
            <h5>Discription</h5>
            <p>{projectData.overview}</p>
            <h5>Tchnologies</h5>
            <p>{projectData.language}</p>
            </Col>
            </Row></Modal.Body>
        <Modal.Footer>
         <Link to={projectData.gitHub} target='_blank'><i class="fa-brands fa-github text-success fs-3"></i></Link>
         <Link  to={projectData.website} target='_blank'><i class="fa-solid fa-link text-success fs-3 ms-3"></i></Link>
        </Modal.Footer>
      </Modal>



</>
  )
}

export default ProjectCard
