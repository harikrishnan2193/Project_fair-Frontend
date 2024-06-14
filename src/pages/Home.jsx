import React, { useEffect, useState } from 'react'
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
        <div className="row" style={{backgroundColor:'gray'}}>
            <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center flex-column">
                <h1 className='ms-auto' style={{fontSize:'60px',color:'white'}}>Project <span style={{color:'yellowgreen'}}>Fair</span></h1>
                        <p className='ms-auto' style={{color:'white'}}>One <span style={{color:'purple'}}>Stop destination for all software development project</span></p>
                    {islogin ?
                        <Link className='ms-auto mt-4' to={'/dashboard'}><button className='btn btn-success rounded me-2'>Manage Project <i class="fa-solid fa-arrow-right"></i></button></Link> :
                        <Link className='ms-auto mt-4' to={'/login'}><button className='btn btn-success rounded me-2'>Get Start <i class="fa-solid fa-arrow-right"></i></button></Link>
                    }
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center">
            <img width={'450px'} src={titleImage} alt="no image" className='  mb-5' style={{marginTop:'100px',borderRadius:'30px'}}/>
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
