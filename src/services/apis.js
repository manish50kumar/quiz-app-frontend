const BASE_URL = process.env.REACT_APP_BASE_URL


// auth endpoints

export const endpoints = {
    // auth
    SIGNUP_API: BASE_URL + "/auth",
    VERIFY_REGISTER_OTP_API: BASE_URL + "/auth/verify-registration-otp/",
    LOGIN_API: BASE_URL + "/auth/login",
    ACTIVATE_ACCOUNT_API: BASE_URL + "/auth/activate",
    FORGET_PASSWORD_API:BASE_URL + "/auth/forgotpassword",
    RESET_PASSWORD_API:BASE_URL + "/auth/forgotpassword/", // POST + PARAMS

    //profile
    GET_USER_DETAIL_API : BASE_URL + "/user",
    UPDATE_USER_DETAIL_API: BASE_URL + "/user",
    CHANGE_USER_PASSWORD_API: BASE_URL + "/user/changepassword",
    DEACTIVATE_ACCOUNT_API : BASE_URL + "/user/deactivate",
    DEACTIVATE_ACCOUNT_VERIFY_OTP_API : BASE_URL + "/user/deactivate/verify-deactivate-account-otp",
    
    // quiz 
    CREATE_QUIZ_API: BASE_URL + "/quiz",
    FIND_ALL_QUIZ_API : BASE_URL +"/quiz", // get
    UPDATE_QUIZ_API : BASE_URL +"/quiz", // put
    DELETE_QUIZ_API : BASE_URL +"/quiz", // DEL + params
    PUBLISHED_QUIZ_API: BASE_URL + "/quiz/publish", // patch
    

    // All published quies for exam
    ALL_PUBLISHED_QUIZ_API: BASE_URL + "/quiz/allpublishedquiz" ,// get

    //exam
    START_EXAM_API: BASE_URL + "/exam/", // get + param
    SUBMIT_EXAM_API : BASE_URL + "/exam", // post
    
    // favourite question 
    ADD_FAVOURITE_QUESTION_API: BASE_URL + "/favquestion",

    //Result Report 
    ALL_REPORT_API : BASE_URL + "/report",
    PARTICULAR_REPORT_API: BASE_URL + "/report/", // get + param
    SHOW_FAVOURITE_QUESTIONS_API : BASE_URL + "/favquestion", // get
    DELETE_FAVOURITE_QUESTIONS_API : BASE_URL + "/favquestion/" // Delete + params

}    