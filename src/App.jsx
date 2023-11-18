
// import './App.css';
import { Route,Routes } from "react-router-dom";



import NavBar from "./components/common/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyRegisterOTP from "./pages/VerifyRegisterOTP";


function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter ">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-register-otp" element={<VerifyRegisterOTP />} />
        
      </Routes>
    </div>
  );
}

export default App;
