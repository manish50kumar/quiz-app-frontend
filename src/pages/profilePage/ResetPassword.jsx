import { useState } from "react";


import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/operations/authAPI";
import { useParams } from "react-router-dom";


// reset password page
function ResetPassword () {
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const { userId } = useParams();
 
    

    const handleOnPasswordChange = (e) => {
        
        setPassword(e.target.value);

    }
    const handleOnConfirmPasswordChange = (e) => {
        
        setConfirmPassword(e.target.value);

    }
    const handleOnReset = async (e) => {
        e.preventDefault(); 
        await resetPassword(password, confirmPassword,userId, navigate)
    }

    return (
        <div className="flex flex-col bg-slate-400  items-center h-[86vh] pt-5">
            <h1 className="text-white font-bold text-3xl">Email : </h1>
            <input type="text"
                name="password"
                placeholder="enter password"
                value={password}
                onChange={handleOnPasswordChange}
                className="w-[250px]  p-3 mt-2"
            /> <br />
            <input type="text"
                name="confirmPassword"
                placeholder="enter confirm password"
                value={confirmPassword}
                onChange={handleOnConfirmPasswordChange}
                className="w-[250px]  p-3 mt-2"
            /> <br />

            <div>
                <button onClick={handleOnReset}
                    className="p-3 mt-3 text-white font-medium bg-blue-500 w-[250px]"
                >
                    Reset
                </button>
            </div>
        </div>

    )
}

export default ResetPassword;


