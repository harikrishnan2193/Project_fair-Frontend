import React, { createContext, useState } from 'react'

export const addProjectresponseContext = createContext()

export const editProjectresponseContext = createContext()

export const isAuthTokenContext =createContext()

function ContextShare({children}) {
  //children is a predefined props used to share data between all components
  //data to share
  const [addProjectresponse, setAddProjectResponse] = useState({})

  const [editProjectresponse, setEditProjectResponse]= useState({})

  const [isAuthToken,setIsAuthToken] = useState(true)

  return (
    <>
    {/* provider - provider provides the  data to the components
    children - provide data to every eomponent
    value - data to be provide */}
    <addProjectresponseContext.Provider value={{addProjectresponse, setAddProjectResponse}}><editProjectresponseContext.Provider value={{editProjectresponse, setEditProjectResponse}}>
      <isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}>{children}
      </isAuthTokenContext.Provider>
    </editProjectresponseContext.Provider>
    </addProjectresponseContext.Provider>
    </>
  )
}

export default ContextShare

// 65781e8b57d4a1e6a3af9ef9