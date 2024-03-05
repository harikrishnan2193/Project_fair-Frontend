import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseurl';
import { editprojectAPI } from '../services/allAPI';
import { editProjectresponseContext } from '../context/ContextShare';
import { useContext } from 'react';

function EditProject({project}) {
    const {editProjectresponse, setEditProjectResponse} = useContext(editProjectresponseContext)
    const [show, setShow] = useState(false);
    //state to hold the value of inputbox
    const [projectDetails, setProjectDetails] = useState({
        id:project._id,
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectImage: ""
      })

      console.log(projectDetails);

      console.log(project);

      

      

      

      const [preview, setPreview] = useState("")

    const handleClose = ()=>{setShow(false)
        handleClose1()
    }
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(projectDetails.projectImage){
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    },[projectDetails.projectImage])

    const handleClose1 = ()=>{
        setProjectDetails({
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""
        })
        setPreview("")
    }

    const handleUpdate = async(e)=>{
        e.preventDefault()

        const {id , title , language , github , website , overview , projectImage} = projectDetails

        if(!title || !language || !github || !website || !overview){
            alert('Please fill the form completely')
        }
        else{

        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
        

        const token = sessionStorage.getItem("token")

        if(preview){
            const reqHeader ={
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
               }

               const result = await editprojectAPI(id,reqBody,reqHeader)
               console.log(result);
               if(result.status === 200){
                alert("Updated successfully")
                handleClose()
                setEditProjectResponse(result.data)
               }
               else{
                console.log(result.response.data);
               }
        }
        else{
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
              }
              
              const result = await editprojectAPI(id,reqBody,reqHeader)
               console.log(result);
               if(result.status === 200){
                alert("Updated successfully")
                handleClose()
                setEditProjectResponse(result.data)
               }
               else{
                console.log(result.response.data);
               }
               
        }

        }
        
    }

  return (
    <>
        <button onClick={handleShow} className='btn'><i class="fa-solid fa-pen text-info"></i></button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Detils</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-6">
                    <label htmlFor='upload'>
                        <input id='upload' type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                        <img src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="no image" width='100%'/>
                    </label>
                </div>
                <div className="col-6">
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control' placeholder='Project Title'  value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control' placeholder='Language' value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})}/>
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control' placeholder='GitHub Link' value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}/>
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control' placeholder='Website Link' value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})}/>
                    </div>
                    <div className='mb-3 w-100'>
                        <textarea cols='30' rows='3' type="text"  className='form-control' placeholder='Project Overview'  value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
             Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject