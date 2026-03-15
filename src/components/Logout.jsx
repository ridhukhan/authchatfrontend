import { useUser } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { setUser, setIsAuthenticated } = useUser()
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
    await axios.get(
        "https://mernauth-06db.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      )
       localStorage.removeItem("token") 
       setUser(null)
      setIsAuthenticated(false)
      toast.success("quit success")
      navigate("/login")

      
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#ff4444",
        color: "white",
        border: "none",
        padding: "8px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#cc0000"}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ff4444"}
    >
      🚪 Logout
    </button>
  )
}

export default Logout