import React, { createContext, useState } from 'react'

//create a context
export const addProjectResponseContext=createContext()
export const editProjectResponseContext=createContext()//////s1
export const isAuthTokenContext=createContext()





function ContextShare({children}) {
//children is a predefined props to share data between all components
//create a state ,this state is used to share between components
const[addProjectResponse,setAddProjectResponse]=useState({})
const [editProjectResponse,setEditProjectResponse]=useState({})/////s2
const [isAuthToken,setIsAuthToken]=useState(false)



  return (
   <>
<addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
  <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
<isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}>
  {children}
</isAuthTokenContext.Provider>
  </editProjectResponseContext.Provider>

{/*after this go to main.jsx make some changes* line no s3*/}
</addProjectResponseContext.Provider>
   </>
  )
}

export default ContextShare
