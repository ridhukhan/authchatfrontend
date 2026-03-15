import React from "react";
import { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [verificationMethod, setVerificationMethod] = useState("email")
const [loading,setLoading]=useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await axios.post("https://mernauth-06db.onrender.com/api/v1/user/register", {
        username, email, password, phone: `+880${phone}`, verificationMethod
      })
      toast.success("we send a code your contact number")
      console.log(data)
      navigate("/verifyotp", {
        state: { email, phone, verificationMethod }
      })
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(error.response?.data?.message)
    }finally{
      setLoading(false)
    }
  }

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

        <h2 style={{
          textAlign: "center",
          color: "#075e54",
          fontSize: "28px",
          marginBottom: "8px"
        }}>
          Create Account
        </h2>
        <p style={{
          textAlign: "center",
          color: "#999",
          fontSize: "14px",
          marginBottom: "30px"
        }}>
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            style={inputStyle}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            style={inputStyle}
          />

          <div style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "10px",
            overflow: "hidden"
          }}>
            <span style={{
              padding: "12px 15px",
              backgroundColor: "#f5f5f5",
              color: "#333",
              fontWeight: "bold",
              borderRight: "1px solid #ddd",
              fontSize: "14px"
            }}>
              +880
            </span>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="1XXXXXXXXX"
              style={{
                flex: 1,
                padding: "12px 15px",
                border: "none",
                outline: "none",
                fontSize: "14px"
              }}
            />
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={inputStyle}
          />

          <div style={{
            backgroundColor: "#f9f9f9",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #eee"
          }}>
            <p style={{ margin: "0 0 10px 0", color: "#555", fontSize: "14px", fontWeight: "bold" }}>
              Verification Method
            </p>
            <div style={{ display: "flex", gap: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="verificationMethod"
                  value="email"
                  checked={verificationMethod === "email"}
                  onChange={(e) => setVerificationMethod(e.target.value)}
                  style={{ accentColor: "#075e54" }}
                />
                <span style={{ fontSize: "14px", color: "#333" }}>EMAIL</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "not-allowed", opacity: 0.5 }}>
                <input
                  type="radio"
                  name="verificationMethod"
                  value="phone"
                  disabled
                  checked={verificationMethod === "phone"}
                  onChange={(e) => setVerificationMethod(e.target.value)}
                  style={{ accentColor: "#075e54" }}
                />
                <span style={{ fontSize: "14px", color: "#333" }}>PHONE</span>
              </label>
            </div>
          </div>

          <button type="submit" style={{
            backgroundColor: "#075e54",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "5px"
          }} disabled={loading}>
           {loading? "submitting...":" REGISTER"}
          </button>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#666", margin: 0 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#075e54", fontWeight: "bold", textDecoration: "none" }}>
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "12px 15px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box"
}

export default Register;