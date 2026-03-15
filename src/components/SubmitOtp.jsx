import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SubmitOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const { email, phone, verificationMethod } = location.state || {};
  const navigate = useNavigate();
const [loading,setLoading]=useState(false)
  const submithandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!otp) return toast.error("অনুগ্রহ করে OTP দিন");

    const dataToSend = {
      otp: otp.trim(),
      verificationMethod,
      ...(verificationMethod === "email" ? { email } : { phone })
    };

    try {
      const { data } = await axios.post(
        "https://mernauth-06db.onrender.com/api/v1/user/otp-verification",
        dataToSend,
        { withCredentials: true }
      );
      localStorage.setItem("token", data.token)
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "ভেরিফিকেশন ব্যর্থ হয়েছে";
      toast.error(message);
    }finally {setLoading(false)}
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "420px"
      }}>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "40px" }}>🔐</div>
          <h2 style={{ color: "#075e54", fontSize: "26px", margin: "10px 0 5px" }}>
            OTP Verify
          </h2>
          <p style={{ color: "#999", fontSize: "14px", margin: 0 }}>
            {verificationMethod === "email" ? email : phone} এ OTP পাঠানো হয়েছে
          </p>
        </div>

        <form onSubmit={submithandler} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          <input
            type="text"
            placeholder="OTP লেখো"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              padding: "12px 15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "16px",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
              textAlign: "center",
              letterSpacing: "8px",
              fontWeight: "bold"
            }}
          />

          <button disabled={loading} type="submit" style={{
            backgroundColor: "#075e54",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }} >
           {loading?"submitting....":" VERIFY করো"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default SubmitOtp;