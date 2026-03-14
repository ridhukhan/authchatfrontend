
import React from 'react'

import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const SubmitOtp = () => {
const [otp,setOtp]=useState("")
const location=useLocation()
const {email,phone,verificationMethod}=location.state
const navigate =useNavigate()

const submithandler =(e)=>{
e.preventDefault()
  let dataToSend={}
    if(verificationMethod==="email"){
        dataToSend={otp,email,verificationMethod}
    }else{
         dataToSend={otp,phone,verificationMethod}
    }
try {
  const {data}=axios.post("https://mernauth-06db.onrender.com/api/v1/user/otp-verification",dataToSend,{withCredentials:true})
console.log(data)
toast.success("verify successfully")
navigate("/login")
} catch (error) {
    toast.error(error.response?.data?.message)
    console.log(error.response?.data?.message)
}
}
  return (
    <div>
        <form action="" onSubmit={submithandler}>

            <input type="number" value={otp}
            
            onChange={(e)=>setOtp(e.target.value)}
            />
            <button type='submit'>send OTP</button>
        </form>
    </div>
  )
}

export default SubmitOtp