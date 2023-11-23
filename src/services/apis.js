const BASE_URL = process.env.REACT_APP_BASE_URL


// auth endpoints

export const endpoints = {
    // auth
    SIGNUP_API: BASE_URL + "/auth",
    VERIFY_REGISTER_OTP_API: BASE_URL + "/auth/verify-registration-otp/",
    LOGIN_API: BASE_URL + "/auth/login",

    //profile
    GET_USER_DETAIL_API : BASE_URL + "/user"

}    