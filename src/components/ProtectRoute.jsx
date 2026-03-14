import React from 'react'
import { useUser } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({children}) => {
const {isAuthenticated,loading}=useUser()

if(loading) return <p>Loading.....</p>

if(!isAuthenticated)
    return <Navigate to={"/login"}/>

return children
}

export default ProtectRoute