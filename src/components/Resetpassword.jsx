import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const Resetpassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { token } = useParams()
  const navigate = useNavigate()

  const resethandler = async (e) => {
    e.preventDefault()
    try {
      await axios.put(
        `http://localhost:4000/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        { withCredentials: true }
      )
      toast.success("password reset successfully")
      navigate("/login")
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
          <div style={{ fontSize: "40px" }}>🔒</div>
          <h2 style={{ color: "#075e54", fontSize: "26px", margin: "10px 0 5px" }}>
            Reset Password
          </h2>
          <p style={{ color: "#999", fontSize: "14px", margin: 0 }}>
            Enter your new password
          </p>
        </div>

        <form onSubmit={resethandler} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          <input
            type="password"
            value={password}
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
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
            marginTop: "5px"
          }}>
            RESET PASSWORD
          </button>

        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: "12px 15px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box"
}

export default Resetpassword