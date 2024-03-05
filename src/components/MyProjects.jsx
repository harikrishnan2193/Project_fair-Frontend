import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import AddProject from './AddProject';
import { deleteUserprojectAPI, userprojectAPI } from '../services/allAPI';
import { addProjectresponseContext, editProjectresponseContext } from '../context/ContextShare';
import EditProject from './EditProject';

function MyProjects() {

  const {addProjectresponse, setAddProjectResponse} = useContext(addProjectresponseContext)
  const{editProjectresponse, setEditProjectResponse} = useContext(editProjectresponseContext)

  const [userProject,setUserProject] = useState([])

  const getUserProject = async()=>{

    const token = sessionStorage.getItem("token")

    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    }

    const result = await userprojectAPI(reqHeader)
    console.log(result.data);
    setUserProject(result.data)

  }

  useEffect(()=>{
    getUserProject()
  },[addProjectresponse,editProjectresponse])

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteUserprojectAPI(id,reqHeader)
    console.log(result);
    if(result.status===200){
      getUserProject()
    }
    else{
      console.log(result.response.data);
    }
  }

  console.log(userProject);
 

  return (
    <>
      <div className='card shadow ms-3'>
        <Card>
        <Card.Header className='d-flex justify-content-between mt-2 mb-2'><h3 className='text-success'>My Project</h3> 
        <div><AddProject/></div>
        </Card.Header>

        
          <div className='mt-4'>
          {userProject?.length>0?
          userProject?.map((item)=>(<div className='border align-items-center rounded p-2 m-3 d-flex mb-3 bg-light'>
          <h5>{item.title}</h5>
         



          <div className='icon ms-auto'>

            <EditProject project = {item}/>

            <a href={item.github} target='_blank' className='btn'><i class="fa-brands fa-github text-success"></i></a>
            <button onClick={()=>handleDelete(item._id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
          </div>
          </div>))
          :
          <p className='text-danger fs-3 ms-3'>No project uploaded yet !!</p>}
        </div>
      </Card>
      </div>

    </>
  )
}

export default MyProjects