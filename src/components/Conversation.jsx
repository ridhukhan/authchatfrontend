import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useUser } from '../context/AuthContext'
import { useSocket } from '../context/SocketContext'
import { useNotification } from '../hooks/useNotification'

const Conversation = () => {
 const {showNotification}= useNotification()
  const location = useLocation()
  const { user } = location.state
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const { id } = useParams()
  const latest = useRef(null)
  const { user: me } = useUser()  
        const token = localStorage.getItem("token")
const [loading,setLoading]=useState(false)
const {socket}=useSocket()
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `https://mernauth-06db.onrender.com/api/v1/user/getMessage/${id}`,
          { withCredentials: true,
             headers: { Authorization: token ? `Bearer ${token}` : "" } 

           }
        )
        setMessages(data.messages)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessages()
  }, [id])
useEffect(()=>{
  if(socket){
    socket.on("newMessage",(msg)=>{
      setMessages((prev)=>[...prev,msg])

      if(document.hidden){
        showNotification(
          "নতুন Message! 🕊️",
          msg.message
        )
      }
    })
  }
  return ()=>socket?.off("newMessage")
},[socket])

 useEffect(() => {
    latest.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await axios.post(
      `https://mernauth-06db.onrender.com/api/v1/user/sendMessage/${id}`,
      { message: text },
      { withCredentials: true,

        headers:{Authorization:token?`Bearer ${token}`:""}
       }
    )

    socket.emit("sendMessage",{
      sender:me._id,
      receiver:id,
      message:text
    })
    setMessages([...messages, { message: text, _id: Date.now(), sender: me._id }])
    setText("")
    setLoading(false)
  }

 
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", fontFamily: "Arial" }}>

      <div style={{
        backgroundColor: "#075e54",
        padding: "15px",
        borderRadius: "10px 10px 0 0",
        color: "white",
        fontSize: "18px",
        fontWeight: "bold"
      }}>
        💬 {user.username}
      </div>

      <div style={{
        height: "400px",
        overflowY: "scroll",
        backgroundColor: "#ece5dd",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        {messages.map((msg) => {
          const isMine = msg.sender?.toString() === me._id?.toString()
          return (
            <div key={msg._id} style={{
              display: "flex",
              justifyContent: isMine ? "flex-end" : "flex-start"
            }}>
              <p style={{
                backgroundColor: isMine ? "#dcf8c6" : "white",
                padding: "8px 12px",
                borderRadius: isMine ? "10px 0 10px 10px" : "0 10px 10px 10px",
                maxWidth: "70%",
                margin: 0,
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                fontSize: "14px"
              }}>
                {msg.message}
              </p>
            </div>
          )
        })}
        <div ref={latest} />
      </div>

      <form onSubmit={handleSubmit} style={{
        display: "flex",
        gap: "8px",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        borderRadius: "0 0 10px 10px"
      }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Message লেখো..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
            fontSize: "14px"
          }}
        />
        <button type="submit" style={{
          backgroundColor: "#075e54",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          fontSize: "18px"
        }} disabled={loading}>
      {loading ? (
    <div style={{
      width: "18px",
      height: "18px",
      border: "2px solid white",
      borderTop: "2px solid transparent",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite"
    }} />
  ) : "➤"}
        </button>
      </form>
    </div>
  )
}

export default Conversation