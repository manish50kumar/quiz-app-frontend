import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setToken } from "../../slices/authSlice";

const {
    GET_USER_DETAIL_API,
    UPDATE_USER_DETAIL_API,
    CHANGE_USER_PASSWORD_API,
    DEACTIVATE_ACCOUNT_API,
    DEACTIVATE_ACCOUNT_VERIFY_OTP_API
} = endpoints;


// fetch user details functionality connect to backend  
export async function userDetails(token) {
    try {
        const response = await apiConnector("GET", GET_USER_DETAIL_API, null, {
        Authorization: `Bearer ${token}`,
      });
         console.log("GET USER RESPONSE : ", response);
        if (response.data.status !== "success") {
            throw new Error(response.data.message);
        }
        return response.data.data;
    }
    catch (error) {
        console.log("ERROR IN USER DETAILS : ", error.response.data.message);
        toast(error.response.data.message);
    }
}


// update user details function to connect backend
export async function updateUserDetails(name,token,navigate) {
    try {
        const response = await apiConnector("PUT", UPDATE_USER_DETAIL_API,
            {
                name
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );

         console.log("UPDATE PROFILE RESPONSE : ", response);
        if (response.data.status !== "success") {
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        navigate("/profile");

    }
    catch (error) {
        console.log("UPDATE PROFILE ERROR : ", error.data.message);
        toast.error(error.data.message); 
        navigate("/profile/update-profile")
    }
}


// change password function to connect backend 
export async function changePassword(currentPassword, newPassword, confirmPassword,token, navigate) {
    try {
        const response = await apiConnector("PUT", CHANGE_USER_PASSWORD_API,
            {
                currentPassword,
                newPassword,
                confirmPassword
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );

         console.log("CHANGE PASSWORD RESPONSE : ", response);
        if (response.data.status !== "success") {
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        navigate("/profile");
    }
    catch (error) {
        console.log("CHANGE PASSWORD ERROR : ", error.response);
        toast.error(error.response.data.message); 
        navigate("/profile/change-password")
    }
}


// deactivate account function to connect backend
export async function deactivatUserAccount(token, navigate) {
    try {
        const response = await apiConnector("PATCH", DEACTIVATE_ACCOUNT_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

         console.log("Deactivate ACCOUNT RESPONSE : ", response);
        if (response.data.status !== "success") {
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        
        navigate("/profile/deactivate/verify-otp");
    }
    catch (error) {
        console.log("ERROR IN DEACTIVATE ACCOUNT : ", error.response);
        toast.error(error.response.data.message); 
        
    }
}



// deactivate account otp verify functionality
export async function deactivatAccountOTPVerify(otp,token,dispatch, navigate) {
    try {
        const response = await apiConnector("POST", DEACTIVATE_ACCOUNT_VERIFY_OTP_API,
            {
                otp
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );

         console.log("Deactivate ACCOUNT RESPONSE : ", response);
        if (response.data.status !== "success") {
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        
        dispatch(setToken(null));
        localStorage.removeItem("token");
        navigate("/");
    }
    catch (error) {
        console.log("ERROR IN DEACTIVATE ACCOUNT : ", error.response);
        toast.error(error.response.data.message); 
        
    }
}