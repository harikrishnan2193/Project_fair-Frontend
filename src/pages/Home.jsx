import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../images/9700_4_04.jpg'
import ProjectCards from '../components/ProjectCards'
import { Link } from 'react-router-dom'
import { homeprojectAPI } from '../services/allAPI'

export default function Home() {
    const [islogin , setIslogin] = useState(false)
    const [homeProject, setHomeProject] = useState([])

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIslogin(true)
        }
    },[])


    const getHomeProject = async()=>{
        const result = await homeprojectAPI()
        console.log(result.data);
        setHomeProject(result.data)

    }
    useEffect(()=>{
        getHomeProject()
    },[])

  return (
    <>
        <div style={{width:'100%',height:'100vh',backgroundColor:'gray'}}>
            <div className='container-fluid rounded'>
                <Row className='align-items-center p-5'>
                    <Col sm={12} md={6}>
                        <h1 style={{fontSize:'80px',color:'white'}}>Project <span style={{color:'yellowgreen'}}>Fair</span></h1>
                        <p style={{color:'white'}}>One <span style={{color:'purple'}}>Stop destination for all software development project</span></p>
                    {islogin ?
                        <Link to={'/dashboard'}><button className='btn btn-success rounded'>Manage Project <i class="fa-solid fa-arrow-right"></i></button></Link> :
                        <Link to={'/login'}><button className='btn btn-success rounded'>Get Start <i class="fa-solid fa-arrow-right"></i></button></Link>
                    }
                    </Col>
                    <Col sm={12} md={6}>
                       <img src={titleImage} alt="no image" className='w-75 ms-5' style={{marginTop:'100px',borderRadius:'30px'}}/>
                    </Col>
                </Row>
            </div>

        </div>

        <div className='mt-5 all-project mb-5'>
            <h1 className='text-center'>All Project</h1>
            <marquee scrollAmount={20} className='mt-5'>
                <div className='d-flex'>
                    { homeProject?.length>0?
                    homeProject?.map((item)=>(<div className='ms-5' style={{width:'500px'}}>
                    <ProjectCards project={item}/>
                </div>))
                        :null
                    }
    
                
                </div>
            </marquee>
            <div className='text-center fw-bold mt-2 pb-5'>
                <Link to={'/project'} style={{fontSize:'large'}}>See more project</Link>

            </div>
        </div>
    </>
  )
}
