// context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useUser } from "./AuthContext"

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user, isAuthenticated } = useUser()

  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = io("https://mernauth-06db.onrender.com", {
        withCredentials: true
      })

      newSocket.emit("userOnline", user._id)

      newSocket.on("onlineUsers", (users) => {
        setOnlineUsers(users)
      })

      setSocket(newSocket)

      return () => newSocket.disconnect()
    }
  }, [isAuthenticated, user])

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)