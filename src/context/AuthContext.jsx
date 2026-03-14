import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext=createContext()

export const UserProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [loading,setLoading]=useState(true)



    const getUser=async()=>{
        try {
            const {data}=await axios.get("https://mernauth-06db.onrender.com/api/v1/user/me",{
                withCredentials:true
            })
            setUser(data.user)
            setIsAuthenticated(true)
        } catch (error) {
            setUser(null)
            setIsAuthenticated(false)
console.log(error.response?.data?.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getUser()
    },[])
    return (


        <UserContext.Provider value={{user,isAuthenticated,loading,setUser,setIsAuthenticated}}>
{children}

        </UserContext.Provider>
    )
}
export const useUser=()=>useContext(UserContext)