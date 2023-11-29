

import homeLogo from "../../assets/logo/homeLogo.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useSelector,useDispatch } from "react-redux";

import {setToken} from "../../slices/authSlice"


function NavBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { token } = useSelector((state) => state.auth);

    const handleOnLogout = (e) => {
        dispatch(setToken(null));
        localStorage.removeItem("token");
        navigate("/");
    }
    

    return (
        <div className="flex h-[100px] w-[100%] relative    items-center justify-around border-b-[2px] border-b-blue-700  bg-slate-700 text-white ">
            <div className="w-[60px]  ">
                <Link to="/">
                    <img src={homeLogo} alt="Logo" width={160} height={32} loading="lazy" />
                </Link>
            </div> 
            <div>
                <h1 className="font-bold text-4xl">Quiz App</h1>
            </div>
            <div className="flex items-center gap-8 font-bold ">
                <div className="border border-slate-500 pt-2 pb-2 pl-4 pr-4 rounded-[18px] hover:bg-slate-600 transition duration-700 ease-in-out">
                    <Link to="/">
                       Home
                    </Link>
                </div>
                <div className="border border-slate-500 pt-2 pb-2 pl-4 pr-4 rounded-[18px] hover:bg-slate-600 transition duration-700 ease-in-out">
                    <Link to="/about">
                        About
                    </Link>
                </div>
                {
                    token ?
                        (<div className="flex gap-7">
                            <div className="border border-slate-500 pt-2 pb-2 pl-4 pr-4 rounded-[18px] hover:bg-slate-600 transition duration-700 ease-in-out">
                                <Link to="/quizes">
                                    Quizes
                                </Link>
                            </div>
                            <div className="border border-slate-500 pt-2 pb-2 pl-4 pr-4 rounded-[18px] hover:bg-slate-600 transition duration-700 ease-in-out">
                                <Link to="/profile">
                                    Profile
                                </Link>
                            </div>
                            <div className="border border-slate-500 pt-2 pb-2 pl-4 pr-4 rounded-[18px] hover:bg-slate-600 transition duration-700 ease-in-out">
                                <button onClick={handleOnLogout}>logout</button>
                            </div>

                           
                        </div>)
                        :
                         <div className="flex gap-7">
                    <div className="border border-slate-500 pt-2 pb-2 pl-4 pr-4 rounded-[18px] hover:bg-slate-600 transition duration-700 ease-in-out">
                    <Link to="/signup">
                        SignUp
                    </Link>
                </div>
                <div className="border border-slate-500 pt-2 pb-2 pl-4 pr-4 rounded-[18px] hover:bg-slate-600 transition duration-700 ease-in-out">
                    <Link to="/login">
                        Login
                    </Link>
                </div>
                </div>
               }
            </div>
        </div>
    )
}

export default NavBar;