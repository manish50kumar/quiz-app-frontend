import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function VerifyRegisterOTP() {
    
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        
        setOtp(e.target.value);

    }
    const handleOnVerify = (e) => {
        e.preventDefault();
        console.log(otp);
        toast.success("Successful verify");
        // reset 
        setOtp("");
        navigate("/login");

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