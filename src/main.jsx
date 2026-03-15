import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import "./index.css"

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("/sw.js")
   .then(() => console.log("Service Worker registered "))
    .catch((err) => console.log("SW error:", err))
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <UserProvider>
    <SocketProvider>
    <App />
    </SocketProvider>
 </UserProvider>
  </StrictMode>
);
