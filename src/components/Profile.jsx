import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from "../services/baseurl"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProfileAPI } from '../services/allAPI';


function Profile() {

  const [open, setOpen] = useState(false);

  const [userProfile , setUserProfile] = useState({
    username:"",
    email:"",
    password:"",
    github:"",
    linkedin:"",
    profile:""
  })
  const [isUpdate,setIsUpdate] = useState(false)
  //once an image is uploaded then that image will be stored in existing user
  const [existingImage , setExistingImage] = useState("")
  //to hold the url of the new image 
  const [preview , setPreview] = useState("")

  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem("existingUser"))

    setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,profile:""})

    setExistingImage(user.profile)
  },[isUpdate])

  useEffect(()=>{
     if(userProfile.profile){
      setPreview(URL.createObjectURL(userProfile.profile))
     }
     else{
      setPreview("")
     }
  },[userProfile.profile])

  const handleProfileUpdate = async() =>{
    const {username,email,password,github,linkedin,profile} = userProfile

    if(!github || !linkedin){
      toast.info('Please Fill The Form Completely')
    }
    else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)
    
    const token = sessionStorage.getItem("token")

    if(preview){
      const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
       }
       const result = await editProfileAPI(reqBody,reqHeader)
       console.log(result);
       if(result.status === 200){
        toast.success('Profile Updated Successfully')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        setIsUpdate(true)
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
      const result = await editProfileAPI(reqBody,reqHeader)
       console.log(result);
       if(result.status === 200){
        toast.success('Profile Updated Successfully')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        setIsUpdate(true)
       }
       else{
        console.log(result.response.data);
       }
    }
  }
}

  return (
    <>
      <div className='card shadow p-5 me-3 bg ms-3 mt-2' style={{backgroundColor:'orange'}}>
        <div className='d-flex justify-content-between ms-3 mt-3 ' >
          <h3 >Profile</h3>
          <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-upload fa-rotate-180 "></i></button>
        </div>
        
            <Collapse in={open}>
              <div>
                <div className='d-flex justify-content-center align-items-center'>
                  <label>
                    <input id='profile' type="file" style={{display:'none'}} onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})} />
                    {existingImage == ""?
                      <img style={{width:'220px',height:'220px'}} className='rounded-circle' src={
                      preview?preview:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmjvtwqDQtKe_l3MouxaedIHf2awaQFz9p7g&usqp=CAU"} alt="no image" /> : 
                      <img style={{width:'220px',height:'220px'}} className='rounded-circle' src={
                        preview?preview:
                        `${BASE_URL}/uploads/${existingImage}`} alt="no image" />

                      }
                  </label>
                 
                </div>
                <div htmlFor='profile'>
                  <input id='profile' className='w-100  form-control mt-3' type="text" placeholder='Github' value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})} />
                  <input className='w-100 mt-3  form-control ' type="text" placeholder='Linkedin' value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})}/>
                  <button onClick={handleProfileUpdate} className='btn btn-success mt-3 w-100'>Upload</button>
                </div>
              </div>
            </Collapse>

            <ToastContainer theme='colored' autoClose='2000'position='top-center'/>

          
      </div>
    </>
  )
}

export default Profile