import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { deactivatAccountOTPVerify, deactivatUserAccount } from "../../services/operations/profileAPI";



function VerifyDeactivateOTP() {
    
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    

    const handleOnChange = (e) => {
        
        setOtp(e.target.value);

    }
    const handleOnVerify = async (e) => {
        e.preventDefault(); 
        await deactivatAccountOTPVerify(otp, token, dispatch, navigate);
        
    }

    const handleOnResendOTP = async () => {
        await deactivatUserAccount(token,navigate)
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
                </button> <br />
                <button onClick={handleOnResendOTP}
                    className="p-3 mt-3 text-white font-medium bg-blue-500 w-[250px]"
                >
                    ReSend otp
                </button>
            </div>
        </div>

    )
}



export default VerifyDeactivateOTP;