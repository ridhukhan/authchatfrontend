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
    if (!otp) return toast.error("Please enter OTP");

    const dataToSend = {
      otp: otp.trim(), // String হিসেবে পাঠিয়ে ব্যাকএন্ডে তুলনা করা নিরাপদ
      verificationMethod,
      ...(verificationMethod === "email" ? { email } : { phone })
    };

    try {
      const { data } = await axios.post(
        "https://mernauth-06db.onrender.com/api/v1/user/otp-verification",
        dataToSend,
        { withCredentials: true }
      );
      toast.success("Verified successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
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