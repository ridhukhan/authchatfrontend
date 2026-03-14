import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SubmitOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const { email, phone, verificationMethod } = location.state || {};
  const navigate = useNavigate();

  const submithandler = async (e) => {
  e.preventDefault();
  
  if (!otp) return toast.error("অনুগ্রহ করে OTP দিন");

  // ডাটা পাঠানোর আগে নিশ্চিত হওয়া
  const dataToSend = {
    otp: otp.trim(), // সরাসরি স্ট্রিং পাঠান, ব্যাকএন্ডে '!=' সামলে নেবে
    verificationMethod,
    ...(verificationMethod === "email" ? { email } : { phone })
  };

  try {
    const { data } = await axios.post(
      "https://mernauth-06db.onrender.com/api/v1/user/otp-verification",
      dataToSend,
      { withCredentials: true }
    );
    
    toast.success(data.message);
    navigate("/login");
  } catch (error) {
    // এরর মেসেজটি সুন্দর করে দেখানো
    const message = error.response?.data?.message || "ভেরিফিকেশন ব্যর্থ হয়েছে";
    toast.error(message);
    console.log("Error details:", message);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={submithandler}>
        <input 
          type="text" 
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type='submit'>Verify OTP</button>
      </form>
    </div>
  );
};

export default SubmitOtp;