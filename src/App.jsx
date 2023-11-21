
// import './App.css';
import { Route,Routes } from "react-router-dom";



import NavBar from "./components/common/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyRegisterOTP from "./pages/VerifyRegisterOTP";
import Profile from "./pages/Profile";
import Quizes from "./pages/Quizes";
import UpdateProfile from "./pages/profilePage/UpdateProfile";
import PublishedQuiz from "./pages/profilePage/PublishedQuiz";
import DraftQuiz from "./pages/profilePage/DraftQuiz"
import DeactivateAccount from "./pages/profilePage/DeactivateAccount"
import Results from "./pages/profilePage/Results"
import ChangePassword from "./pages/profilePage/ChangePassword"


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
        <Route path="/profile" element={<Profile/>} />
        <Route path="/quizes" element={<Quizes />} />

        {/* profile routes  */}

        <Route path="/profile/update-profile" element ={ <UpdateProfile/> } />
        <Route path="/profile/deactivate" element ={ <DeactivateAccount/> } />
        <Route path="/profile/change-password" element ={ <ChangePassword/> } />
    
        {/* Quiz routes  */}
        
        <Route path="/quizes/published" element={< PublishedQuiz />} />
        <Route path="/quizes/draft" element={<DraftQuiz />} />
        <Route path="/quizes/results" element={ <Results/> } />

      </Routes>
    </div>
  );
}

export default App;
