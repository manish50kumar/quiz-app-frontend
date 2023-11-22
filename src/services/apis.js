const BASE_URL = process.env.REACT_APP_BASE_URL


// auth endpoints

export const endpoints = {
    SIGNUP_API: BASE_URL + "/auth",
    VERIFY_REGISTER_OTP_API:BASE_URL+"/auth/verify-registration-otp/"
}