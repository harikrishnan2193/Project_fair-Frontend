import React, { useContext, useState } from 'react'
import titleImage from '../images/21004063.jpg'
import { Form, Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../context/ContextShare';

function Auth({register}) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const navigate = useNavigate()
  const [userData , setUserData] = useState({
    username:"",
    email:"",
    password:""
  })
  // console.log(userData);
  const RegisterForme =register?true:false

  //function to register
  const handleRegister = async(e)=>{
    e.preventDefault()
    const {username,email,password} = userData

    if(!username || !email || !password){
      toast.info('please fill the form completely')
    }
    else{
      const result =await registerAPI(userData)
      console.log(result);
      if(result.status===200){
        toast.success(`${result.data.username} registed successfully`)
        setUserData({
          username:"",email:"",password:""
        })
        navigate(`/login`)
      }
      else{
        toast.error(`${result.response.data}`)
      }

    }

  } 

  //function to login

  const handleLogin = async(e)=>{
    e.preventDefault()

    const {email,password}= userData
    if(!email || !password){
      toast.info('please fill the form completily')
    }
    else{
      const result = await loginAPI(userData)
      console.log(result);

      if(result.status ===200){
        setIsAuthToken(true)
        //store data
        //in session storage  key:string, value:string
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)

        toast.success('Login successfull')
        
        setUserData({
          username:"",email:"",password:""
        })
        setTimeout(()=>{
          navigate('/')
        },3000)
      }
      else{
        toast.error(result.response.data)
      }
    }
  }
  return (
    <>
        <p className='me-4 mt-5 ms-5'><Link to={'/'} style={{textDecoration:'none'}}><i class="fa-solid fa-arrow-right"></i> Back to Home</Link></p>
        <div style={{width:'100%',height:'100%'}} className='d-flex justify-content-center align-items-center'>
            
            <div className='card shadow bg-success rounded p-5' style={{marginLeft:'100px',marginRight:'100px',marginBottom:'60px'}}>
                <div className="row align-items-center">
                    <div className="col">
                        <img className='w-75 ms-4' style={{height:'300px',borderRadius:'20px'}} src={titleImage} alt="" />
                    </div>
                    <div className="col">
                        <div className='d-flex align-items-center justify-content-center'>
                        <div className='d-flex'>
                          <i style={{fontSize:'40px',color:'white'}} class="fa-solid fa-diagram-project  mb-4 mt-4"></i> 
                          <Link to={'/'} style={{textDecoration:'none'}}><h2 className='ms-3  mb-4 mt-4'>Project Fair</h2></Link>
                          <h5 className='text-light ms-5 mt-4'>
                            {
                              RegisterForme ? "Sign up to your account":"sighn in to your account"
                            }
                          </h5>
                          <div style={{marginTop:'100px',marginLeft:'-200px'}}>
                            { RegisterForme&&
                            <input className='mb-2 form-control' type="text" placeholder='Enter User Name' value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})}/>}
                            <input type="text" className='form-control' placeholder='Enter Your Email-Id' value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} />
                            <input className='mt-2 form-control' type="password"  placeholder='Enter Your Password' value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>

                            { RegisterForme?
                              <div>
                                <h4 onClick={handleRegister} className='btn btn-danger mt-3'>Register</h4>
                                <p className='fw-bold mt-3'>Alrady a user ? click hear to <Link to={'/login'}>login</Link></p>
                              </div>
                            :
                            <div>
                              <h4 onClick={handleLogin} className='btn btn-danger mt-3'>Login</h4>
                              <p className='fw-bold mt-3'>New User...? click hear to <Link to={'/register'}>register</Link></p>
                            </div>
                            }
                          </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme='colored' autoClose='2000'position='top-center'/>
        </div>
    </>
  )
}

export default Auth