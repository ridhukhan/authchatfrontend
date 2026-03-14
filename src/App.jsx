
import { BrowserRouter ,Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
import SubmitOtp from "./components/SubmitOtp";
import{ Toaster} from "sonner"
import Login from "./components/Login";
import Logout from "./components/Logout";
import ForgotPassword from "./components/forgotPassword";
import Resetpassword from "./components/Resetpassword";
import ProtectRoute from "./components/ProtectRoute";
import Conversation from "./components/Conversation";
const App = () => {
  return <>
  <Toaster/>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<ProtectRoute><Home/></ProtectRoute>}/>
    <Route path="/verifyotp" element={<SubmitOtp/>}/>


    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/logout" element={<ProtectRoute><Logout/></ProtectRoute>}/>
    <Route path="/forgotPassword" element={<ForgotPassword/>}/>
<Route path="/password/reset/:token" element={<Resetpassword/>}/>
<Route path="/conversation/:id" element={<ProtectRoute><Conversation/></ProtectRoute>}/>


  </Routes>
  </BrowserRouter>
  
  
  </>;
};

export default App;
