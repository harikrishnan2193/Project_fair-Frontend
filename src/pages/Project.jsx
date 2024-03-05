import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCards from '../components/ProjectCards'
import { allprojectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {

  const [allProject,setAllProject] = useState([])
  const [searchKey,setSearchKey] = useState("")
  const [isToken,setIsToken] = useState(false)

  const getAllProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await allprojectAPI(searchKey,reqHeader)
      console.log(result);
      if(result.status === 200){
        setAllProject(result.data)
      }
      else{
        console.log(result.response.data);
      }
    }
  }
  console.log(allProject);
  console.log(searchKey);

  useEffect(()=>{
    getAllProject()
  },[searchKey])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(true)
    }
  },[])



  return (
    <>
      <Header/>

      <div className='d-flex justify-content-center mt-3'>
        <u><h3>project</h3></u>
      </div>
      <div  className='mt-5 w-25 mx-auto d-flex'>
      <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="text"  className='form-control' placeholder='serch using technologys' />
      <i class="fa-solid fa-magnifying-glass" style={{marginTop:'15px',marginLeft:'-22px',fontSize:'larger'}}></i>
      </div>
      <Row className='container-fluid mb-5 mt-5'>
      {allProject?.length>0?
      allProject?.map((item)=>(<Col className='mb-5' sm={12} md={6} lg={4} >
      <ProjectCards project={item}/>
    </Col>))
        :
        <div>

          {isToken?<p className='text-center fs-3 text-danger'>Sorry No Such Project Currently Avilable</p>:
            <div className='d-flex justify-content-center align-items-center flex-column'>
            <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" height={'200px'} width={'200px'} />
            <p className='text-danger mt-2' style={{fontSize:'30px',textAlign:'center',fontWeight:'bolder'}}>Please <Link style={{textDecoration:'none',color:'blue'}} to={'/login'}>Login</Link> To See More Project</p>
          </div>}
        </div>
        }
      </Row>

    </>
  )
}

export default Project