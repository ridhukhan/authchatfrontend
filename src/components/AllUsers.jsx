import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../context/SocketContext'

const AllUsers = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const { onlineUsers } = useSocket()  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token") 
        const { data } = await axios.get(
          "https://mernauth-06db.onrender.com/api/v1/user/users",
          { withCredentials: true,
            headers:{
              Authorization:token ? `Bearer ${token}`:""
            }
           }
        )
        setUsers(data.users)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "Arial" }}>

      <div style={{
        backgroundColor: "#075e54",
        padding: "15px 20px",
        borderRadius: "10px 10px 0 0",
        color: "white",
        fontSize: "20px",
        fontWeight: "bold"
      }}>
        💬 Chats
      </div>

      <div style={{
        backgroundColor: "white",
        borderRadius: "0 0 10px 10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => navigate(`/conversation/${user._id}`, { state: { user } })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "12px 20px",
              cursor: "pointer",
              borderBottom: "1px solid #f0f0f0",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
          >
            <div style={{ position: "relative" }}>
              <div style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "#075e54",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "bold",
              }}>
                {user?.username?.[0]?.toUpperCase()}
              </div>

              {onlineUsers.includes(user._id) && (
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#25d366",
                  borderRadius: "50%",
                  border: "2px solid white"
                }} />
              )}
            </div>

            <div>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "16px", color: "#333" }}>
                {user.username}
              </p>
              <p style={{
                margin: 0,
                fontSize: "13px",
                color: onlineUsers.includes(user._id) ? "#25d366" : "#999"
              }}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllUsers