import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectresponseContext } from '../context/ContextShare';


function AddProject() {

  const {addProjectresponse, setAddProjectResponse} = useContext(addProjectresponseContext)

  //state to holde values from input box
  const [projectDetails, setProjectDetails] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
  })
  const [show, setShow] = useState(false);

  //state to hold the url of the file
  const[preview , setPreview]= useState("")

  //state to hold token
  const [token , setToken] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }

  },[])

  useEffect(()=>{
    projectDetails.projectImage &&
    setPreview(URL.createObjectURL(projectDetails.projectImage))//url is predefined method in javascript which has createobjectURL method which can convert file into url
  },[projectDetails.projectImage])

  console.log(preview);

  //display state
  console.log(projectDetails);

  const handleClose = ()=>{
    setShow(false)
    handleClose1()
  }
  const handleClose1 = () => {
    
    setProjectDetails({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
    })
    setPreview("")
  }

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //function to add project

  const handleProject = async (e) =>{
    e.preventDefault()

    const { title,language,github,website,overview,projectImage} = projectDetails

    if(!title || !language  || !github || !website || !overview || !projectImage){
      toast.info('please fill the form completely')
    }
    else{
      //reqbody
      //1)create an object of formdata class - since we have uploaded content
      const reqBody = new FormData()
      //2)add data - append() :-use to add an single item
       reqBody.append("title",title)
       reqBody.append("language",language)
       reqBody.append("github",github)
       reqBody.append("website",website)
       reqBody.append("overview",overview)
       reqBody.append("projectImage",projectImage)

       //reqHeader
      if (token) {
        const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
       }

       const result = await addProjectAPI(reqBody,reqHeader)
       console.log(result);

       if(result.status===200){
        console.log(result.data);
         toast.success('Project added succesfully')
         handleClose()

         setAddProjectResponse(result.data)

       }
       else{
        toast.error(result.response.data);
        handleClose1()
       }
      }
    }
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Project
      </Button>

      <div className='row'>
        <div className=''>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Project Detils</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor='upload'>
                            <input id='upload' type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                            <img src={preview?preview:"https://t4.ftcdn.net/jpg/02/83/72/41/240_F_283724163_kIWm6DfeFN0zhm8Pc0xelROcxxbAiEFI.jpg"} alt="no image" width='100%'/>
                        </label>
                    </div>
                    <div className="col-6">
                        <div className='mb-3 w-100'>
                            <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
                        </div>
                        <div className='mb-3 w-100'>
                            <input type="text" className='form-control' placeholder='Language' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
                        </div>
                        <div className='mb-3 w-100'>
                            <input type="text" className='form-control' placeholder='GitHub Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
                        </div>
                        <div className='mb-3 w-100'>
                            <input type="text" className='form-control' placeholder='Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
                        </div>
                        <div className='mb-3 w-100'>
                            <textarea cols='30' rows='3' type="text"  className='form-control' placeholder='Project Overview'  value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleProject}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <ToastContainer theme='colored' autoClose='2000'position='top-center'/>
    </>
  )
}

export default AddProject