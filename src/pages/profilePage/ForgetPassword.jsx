import { useState } from "react";


import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../services/operations/authAPI";

function ForgetPassword () {
    
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
 
    

    const handleOnChange = (e) => {
        
        setEmail(e.target.value);

    }
    const handleOnSubmit = async (e) => {
        e.preventDefault(); 
        await forgetPassword(email,navigate)
    }

    return (
        <div className="flex flex-col bg-slate-400  items-center h-[86vh] pt-5">
            <h1 className="text-white font-bold text-3xl">Email : </h1>
            <input type="text"
                name="email"
                placeholder="enter Email"
                value={email}
                onChange={handleOnChange}
                className="w-[250px]  p-3 mt-2"
            />
            <div>
                <button onClick={handleOnSubmit}
                    className="p-3 mt-3 text-white font-medium bg-blue-500 w-[250px]"
                >
                    Submit
                </button>
            </div>
        </div>

    )
}

export default ForgetPassword;


