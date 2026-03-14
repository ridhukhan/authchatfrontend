import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        "https://mernauth-06db.onrender.com/api/v1/user/password/forgot",
        { email },
        { withCredentials: true }
      )
      toast.success("reset password link send successfully")
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(error.response?.data?.message)
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

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "40px" }}>📧</div>
          <h2 style={{ color: "#075e54", fontSize: "26px", margin: "10px 0 5px" }}>
            Forgot Password
          </h2>
          <p style={{ color: "#999", fontSize: "14px", margin: 0 }}>
            Enter your email, we will send a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          <input
            type="email"
            value={email}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px 15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "14px",
              outline: "none",
              width: "100%",
              boxSizing: "border-box"
            }}
          />

          <button type="submit" style={{
            backgroundColor: "#075e54",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}>
            SEND RESET LINK
          </button>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#666", margin: 0 }}>
            Remember your password?{" "}
            <Link to="/login" style={{
              color: "#075e54",
              fontWeight: "bold",
              textDecoration: "none"
            }}>
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default ForgotPassword