
// import './App.css';
import { Route,Routes } from "react-router-dom";



import NavBar from "./components/common/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgetPassword from "./pages/profilePage/ForgetPassword";
import ResetPassword from "./pages/profilePage/ResetPassword";
import ActivateAccount from "./pages/profilePage/ActivateAccount";
import VerifyRegisterOTP from "./pages/VerifyRegisterOTP";
import Profile from "./pages/Profile";
import Quizes from "./pages/Quizes";
import UpdateProfile from "./pages/profilePage/UpdateProfile";
import PublishedQuiz from "./pages/profilePage/PublishedQuiz";
import DraftQuiz from "./pages/profilePage/DraftQuiz"
import DeactivateAccount from "./pages/profilePage/DeactivateAccount"
import VerifyDeactivateOTP from "./pages/profilePage/VerifyDeactivateOTP";
import Results from "./pages/profilePage/Results"
import ChangePassword from "./pages/profilePage/ChangePassword"
// import CreateQuiz from "./pages/profilePage/CreateQuiz";
import QuizForm from "./pages/profilePage/QuizForm";
import QuizEditor from "./pages/profilePage/QuizEditor";

import StartExam from "./pages/profilePage/StartExam"

import FavouriteQuestions from "./pages/profilePage/FavouriteQuestions"


function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter ">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/forgotpassword/:userId" element={<ResetPassword />} />
        <Route path="/activate-account" element={<ActivateAccount />} />
        <Route path="/verify-register-otp/:token" element={<VerifyRegisterOTP />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/quizes" element={<Quizes />} />

        {/* profile routes  */}

        <Route path="/profile/update-profile" element ={ <UpdateProfile/> } />
        <Route path="/profile/deactivate" element ={ <DeactivateAccount/> } />
        <Route path="/profile/deactivate/verify-otp" element ={ <VerifyDeactivateOTP/> } />
        <Route path="/profile/change-password" element ={ <ChangePassword/> } />
    
        {/* Quiz routes  */}
        
        <Route path="/quizes/published" element={< PublishedQuiz />} />
        <Route path="/quizes/draft" element={<DraftQuiz />} />
        <Route path="/quizes/results" element={<Results />} />
        {/* <Route path="/quizes/create-quiz" element={ <CreateQuiz/> } /> */}
        <Route path="/quizes/create-quiz" element={ <QuizForm/> } />
        <Route path="/quizes/update-quiz" element={<QuizEditor />} />
        
        <Route path="/exam/:quizId" element={<StartExam />} />
        
        <Route path="/favourite-questions" element ={ <FavouriteQuestions/> } />

      </Routes>
    </div>
  );
}

export default App;
