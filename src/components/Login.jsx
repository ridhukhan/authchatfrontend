import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "../context/AuthContext";

const Login = () => {
  const { setUser, setIsAuthenticated } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        "https://mernauth-06db.onrender.com/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("token",data.token)
      setUser(data.user)
      setIsAuthenticated(true)
      toast.success("login successfully");
      navigate("/")
    } catch (error) {
      console.log(error.response?.data?.message)
      toast.error(error.response?.data?.message)
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
          Welcome Back
        </h2>
        <p style={{
          textAlign: "center",
          color: "#999",
          fontSize: "14px",
          marginBottom: "30px"
        }}>
          Login to your account
        </p>

        <form onSubmit={handlesubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <div style={{ textAlign: "right" }}>
            <Link to="/forgotPassword" style={{
              color: "#075e54",
              fontSize: "13px",
              textDecoration: "none",
              fontWeight: "bold"
            }}>
              Forgot password?
            </Link>
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
          }}>
            LOGIN
          </button>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#666", margin: 0 }}>
            Dont have an account?{" "}
            <Link to="/register" style={{
              color: "#075e54",
              fontWeight: "bold",
              textDecoration: "none"
            }}>
              Register
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

export default Login;