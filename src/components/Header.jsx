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
         <div className='d-flex' style={{marginLeft:'250px'}}>
             <i style={{fontSize:'40px',color:'white'}} class="fa-solid fa-diagram-project  mb-4 mt-4"></i> 
              <Link to={'/'} style={{textDecoration:'none'}}><h2 className='ms-3  mb-4 mt-4'>Project Fair</h2></Link>
              {
                dashboard &&
                <button onClick={handleLogout} className='btn btn-warning mt-3' style={{marginLeft:'700px',height:'50px'}}>logout <i class="fa-solid fa-power-off"></i></button>
              }
         </div>
       </div> 
    </>
  )
}

export default Header