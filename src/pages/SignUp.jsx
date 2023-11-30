import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { signUp } from "../services/operations/authAPI";

// sign up page
function SignUp() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword:""
    });
    const navigate = useNavigate();
    

    const { name, email, password, confirmPassword } = formData;

    // Handle input fields , when some value change
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value,
        }))
    }

    // Handle form submission
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        console.log(formData.name);
        signUp(name, email, password, confirmPassword, navigate);
       
        // reset form data
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword:""
        })
        // toast.success("Otp send");
        
        // navigate("/verify-register-otp");
    }

    return (
        <div className="w-[100vw] h-[86vh] flex flex-col items-center  bg-slate-600  text-white pt-6">
            <h1 className="font-bold text-4xl pb-4"> Sign Up </h1>
            <form onSubmit={handleOnSubmit}>
                <div>
                <label htmlFor="name" className="font-medium text-2xl mr-7 mb-4">Name  </label> <br />
                    <input
                        type="text"
                        placeholder="Enter your Name"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleOnChange}
                        className="text-black w-[400px] h-[40px]  rounded-md pl-4"
                    />
                    <br /> <br />
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
                    <br /> <br />
                <label htmlFor="confirmPassword" className="font-medium text-2xl mr-7 mb-4">Conform Password  </label> <br />
                    <input
                        type="text"
                        placeholder="Conform Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        className="text-black w-[400px] h-[40px]  rounded-md pl-4"
                    />
                    <br /> <br />
            </div>
            <div>
                    <button
                        type="submit"
                        className="text-white w-[400px] h-[40px]  rounded-md bg-blue-600">
                        Create Account
                    </button>
            </div>
            </form>
        </div>
    )
}
export default SignUp;