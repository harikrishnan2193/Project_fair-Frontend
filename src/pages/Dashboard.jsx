import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'

export default function Dashboard() {

  const[username, setUsername] = useState("")

  useEffect(()=>{
    
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)

  },[])

  return (
    <>
       <Header dashboard />

       <div>
        <h2 className='mt-3 ms-3'>Welcome<span className='text-warning'>{username}</span></h2>
       </div>
       <div className="row mt-5 mb-5">
        <div className="col-lg-8">
          <MyProjects/>
        </div>
        <div className="col-lg-4">
          <Profile/>
        </div>
       </div>
    </>
  )
}
