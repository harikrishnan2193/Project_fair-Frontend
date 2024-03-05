import React from 'react'
import Card from 'react-bootstrap/Card';
import vedioscnshort from '../images/Screenshot 2023-11-22 152041.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseurl';

function ProjectCards({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(project.projectImage);
  

  return (
    <>
    <Card className='shadow rounded btn' onClick={handleShow} >
      <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project.projectImage}`:vedioscnshort} style={{height:'220px',width:'400px'}}/>
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}><h4>{project.title}</h4></Card.Title>
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <img className='w-100 mt-5' src={project?`${BASE_URL}/uploads/${project.projectImage}`:vedioscnshort} alt="no image"/>
            </div>
            <div className="col-6">
              <h3>{project.title}</h3>
              <h6 style={{textAlign:'justify',color:'red'}}>{project.overview}</h6>
              <p style={{fontWeight:'bold'}}><span className='fs-5'>Technologys Used </span>:{project.language}</p>
            </div>
          </div>
        </Modal.Body>
        
        
            <div className='d-flex mt-4 mb-4'>
              <a href={project.github} target='_blank'><i class="fa-brands fa-github fa-2x ms-3"></i></a>
              <a href={project.website} target='_blanck'><i class="fa-solid fa-link fa-2x ms-5"></i></a>
            </div>
        
          
      </Modal>

    </>
  )
}

export default ProjectCards