import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

import {setToken} from "../../slices/authSlice"

const {
    SIGNUP_API,
    VERIFY_REGISTER_OTP_API,
    LOGIN_API,
    ACTIVATE_ACCOUNT_API,
    FORGET_PASSWORD_API,
    RESET_PASSWORD_API,
    RESEND_REGISTER_OTP_API
} = endpoints;


// sign up backend connection
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


// otp verify for registration backend connection
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


// REsend register otp

export async function resendRegisterotp(registrationToken) {
    try {
        const response = await apiConnector("GET", RESEND_REGISTER_OTP_API + registrationToken);
         
        if (response.data.status !== "success") {
            console.log("Error in check")

            throw new Error(response.data.message);
        }
        console.log("Response OTP : ", response);
        toast.success(response.data.message);
    }
    catch (error) {
        console.log("resend register otp ERROR : ", error.response.data.message);
        toast.error(error.response.data.message);
    }
}

// login functionality for connect backend
export async function login(email, password, navigate,dispatch) {
   
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

// Activate Account functionality connect to backend
export async function activateAccount(email, navigate,dispatch) {
   
        try {
            const response = await apiConnector("POST", ACTIVATE_ACCOUNT_API, {
                email,
                
            })
            console.log("ACTIVATE API RESPONSE : ", response);

            if (response.data.status !== "success") {
                 console.log("Error in check")
                 throw new Error(response.data.message);
            }
            toast.success(response.data.message);    
        } catch (error) {
            console.log("Login ERROR : ", error.response);
            toast.error(error.response.data.message); 
            navigate("/login")
        
        }
    }



// forget Password functionality connect to backend
export async function forgetPassword(email, navigate,dispatch) {
   
        try {
            const response = await apiConnector("POST", FORGET_PASSWORD_API, {
                email,
                
            })
            console.log("FORGET PASSWORD API RESPONSE : ", response);

            if (response.data.status !== "success") {
                 console.log("Error in check")
                 throw new Error(response.data.message);
            }
            toast.success(response.data.message);    
        } catch (error) {
            console.log("Login ERROR : ", error.response);
            toast.error(error.response.data.message); 
            navigate("/login")
        
        }
}

// reset password after forget password functionality connect to backend
export async function resetPassword(password,confirmPassword,userId, navigate) {
   
        try {
            const response = await apiConnector("POST", RESET_PASSWORD_API+userId, {
                password,
                confirmPassword
                
            })
            console.log("FORGET PASSWORD API RESPONSE : ", response);

            if (response.data.status !== "success") {
                 console.log("Error in check")
                 throw new Error(response.data.message);
            }
            toast.success(response.data.message); 
            navigate("/login");
        } catch (error) {
            console.log("Login ERROR : ", error.response);
            toast.error(error.response.data.message); 
            navigate("/login")
        
        }
}


