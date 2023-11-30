import { useState } from "react";
import { useParams } from 'react-router-dom';
import { verifyRegisterOTP } from "../services/operations/authAPI"
import { useNavigate } from "react-router-dom";

// verification otp for registration page 
function VerifyRegisterOTP() {
    
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const { token } = useParams();
    

    const handleOnChange = (e) => {
        
        setOtp(e.target.value);

    }
    const handleOnVerify = async (e) => {
        e.preventDefault(); 
        await verifyRegisterOTP(otp,token,navigate)
    }

    return (
        <div className="flex flex-col bg-slate-400  items-center h-[86vh] pt-5">
            <h1 className="text-white font-bold text-3xl">Verify Email OTP</h1>
            <input type="text"
                name="otp"
                placeholder="enter otp"
                value={otp}
                onChange={handleOnChange}
                className="w-[250px]  p-3 mt-2"
            />
            <div>
                <button onClick={handleOnVerify}
                    className="p-3 mt-3 text-white font-medium bg-blue-500 w-[250px]"
                >
                    Verify
                </button>
            </div>
        </div>

    )
}

export default VerifyRegisterOTP;