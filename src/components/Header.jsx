import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthTokenContext } from '../context/ContextShare'

function Header({dashboard}) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate('/')
    setIsAuthToken(false)
  }
  return (
    <>
       <div style={{backgroundColor:'purple'}}>
         <div className='d-flex'>
             <div className='d-flex ms-3'>
               <i style={{fontSize:'40px',color:'white'}} class="fa-solid fa-diagram-project  mb-4 mt-4"></i> 
                <Link to={'/'} style={{textDecoration:'none'}}><h2 className='mt-4 '>Project Fair</h2></Link>
             </div>
              {
                dashboard &&
                <div className='ms-auto me-4'><button onClick={handleLogout} className='btn btn-warning mt-3 mb-1' >logout <i class="fa-solid fa-power-off"></i></button></div>
              }
         </div>
       </div> 
    </>
  )
}

export default Header