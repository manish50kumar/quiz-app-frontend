import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

import {setToken} from "../../slices/authSlice"

const {
    SIGNUP_API,
    VERIFY_REGISTER_OTP_API,
    LOGIN_API
} = endpoints;



export async function signUp(name, email, password, confirmPassword, navigate) {
    
    try {
        const  response = await apiConnector("POST", SIGNUP_API, {
            name,
            email,
            password,
            confirmPassword,
        })
        console.log("SIGN UP RESPONSE : ", response);
        if (response.data.status !== "success") {
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        navigate(`/verify-register-otp/${response.data.data.token}`);
        // navigate("/verify-register-otp");
        return response.data.data.token;
    }
    catch (error) {
        console.log("SIGN UP ERROR : ", error.response.data.message);
        toast.error(error.response.data.message);
        navigate("/signup");
    }
    
}

export async function verifyRegisterOTP(otp, token, navigate) {
    let response;
    try {
         response = await apiConnector("POST", VERIFY_REGISTER_OTP_API+token, { otp });
        
        console.log("Response OTP : ", response);
        if (response.data.status !== "success") {
            console.log("Error in check")

            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        navigate("/login");
    }
    catch (error) {
        console.log("verify otp ERROR : ", error.response.data.message);
        toast.error(error.response.data.message);
       
        navigate(`/verify-register-otp/${token}`);
        
    }
}


export async function login(email, password, navigate,dispatch) {
    // return async (dispatch) => {
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            })
            console.log("LOGIN API RESPONSE : ", response);

            if (response.data.status !== "success") {
                 console.log("Error in check")
                 throw new Error(response.data.message);
            }
            toast.success("Login Successfull");
            dispatch(setToken(response.data.data.token));
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            navigate("/profile");


        } catch (error) {
            console.log("Login ERROR : ", error.response);
            toast.error(error.response.data.message); 
            navigate("/login")
        
        }
    }
// }

