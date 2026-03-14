import AllUsers from "../components/AllUsers.jsx"
import Logout from "../components/Logout.jsx"
import { useUser } from "../context/AuthContext.jsx"

const Home = () => {
  const { user, isAuthenticated, loading } = useUser()

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial"
      }}>
        <p style={{ color: "#075e54", fontSize: "18px" }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      fontFamily: "Arial"
    }}>

      <div style={{
        backgroundColor: "#075e54",
        padding: "15px 25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ color: "white", margin: 0, fontSize: "22px" }}>
          💬 ChatApp
        </h2>

        {isAuthenticated && (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              backgroundColor: "#128c7e",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "16px"
            }}>
              {user?.username[0].toUpperCase()}
            </div>
            <span style={{ color: "white", fontWeight: "bold" }}>
              {user.username}
            </span>
            <Logout />
          </div>
        )}
      </div>

      <div style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "0 15px"
      }}>
        {isAuthenticated ? (
          <AllUsers />
        ) : (
          <p style={{ textAlign: "center", color: "#999" }}>Please login</p>
        )}
      </div>

    </div>
  )
}

export default Home