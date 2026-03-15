import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import "./index.css"
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <UserProvider>
    <SocketProvider>
    <App />
    </SocketProvider>
 </UserProvider>
  </StrictMode>
);
