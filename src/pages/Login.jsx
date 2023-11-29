import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { setToken } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authAPI"


function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // handle change data
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value
        }))
    }
    //handle on submit data
    const handleOnSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        // localStorage.setItem("token", formData.email);
        // dispatch(setToken(localStorage.getItem("token")));

        login(email, password, navigate,dispatch);

        // reset form 
        setFormData({
            email: "",
            password:""
        })
        navigate("/");
    }

    const handleOnActivate = () => {
        navigate("/activate-account")
    }

    const handleOnForgetPassword = () => {
        navigate("/auth/forget-password");
    }


    return (
        <div className="flex flex-col items-center text-white bg-slate-600 h-[86vh] pt-4">
            <h1 className="font-bold text-4xl pb-4"> Login </h1>
            <form onSubmit={handleOnSubmit}>
                
                <label htmlFor="email" className="font-medium text-2xl mr-7 mb-4">Email  </label> <br />
                    <input
                        type="text"
                        placeholder="Enter your Email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        className="text-black w-[400px] h-[40px]  rounded-md pl-4"
                    />
                <br /> <br />
                
                    <label htmlFor="password" className="font-medium text-2xl mr-7 mb-4">Password  </label> <br />
                   
                    <input
                        type="text"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        className="text-black w-[400px] h-[40px]  rounded-md pl-4"
                />
                <br /><br />
                <button type="submit"
                    
                    className="text-white w-[400px] h-[40px]  rounded-md bg-blue-600"
                >
                    Login
                </button>
            </form>
            <br />
            <button
                    onClick={handleOnForgetPassword}                    
                    className="text-white w-[400px] h-[40px]  rounded-md bg-blue-600"
                >
                    Forget Password
                </button> <br />
            <button
                    onClick={handleOnActivate}                    
                    className="text-white w-[400px] h-[40px]  rounded-md bg-blue-600"
                >
                    Activate Account
                </button>
        </div>
    )
}
export default Login;