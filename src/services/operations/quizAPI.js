import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

import { setData } from "../../slices/updateQuizSlice";


const {
    CREATE_QUIZ_API,
    FIND_ALL_QUIZ_API,
    UPDATE_QUIZ_API,
    PUBLISHED_QUIZ_API,
    ALL_PUBLISHED_QUIZ_API,
    START_EXAM_API,
    ADD_FAVOURITE_QUESTION_API,
    SUBMIT_EXAM_API,
    ALL_REPORT_API,
    PARTICULAR_REPORT_API,
    SHOW_FAVOURITE_QUESTIONS_API,
    DELETE_FAVOURITE_QUESTIONS_API
} = endpoints;


// create quiz function to connect backend
export async function  createQuiz(data,token,navigate) {
    try {
        console.log("Data in create : ", data.name);
        const response = await apiConnector("POST", CREATE_QUIZ_API,
            {
                name: data.name,
                category: data.category,
                questionList: data.questionList,
                answers: data.answers,
                passingPercentage: data.passingPercentage,
                isPublicQuiz: data.isPublicQuiz,
                allowedUser:data.allowedUser
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
         console.log("QUIZ CREATE RESPONSE : ", response);
        if (response.data.status !== "success") {
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        navigate("/quizes/draft")
    }
    catch (error) {
        console.log("ERROR IN CREATE QUIZ : ", error.response);
        toast(error.response.message);
    }
}



// Find all quiz function
export async function findAllQuiz(token) { 
    try {
        const response = await apiConnector("GET", FIND_ALL_QUIZ_API, null, {
            Authorization: `Bearer ${token}`,
        });
        console.log("QUIZ CREATE RESPONSE : ", response);
        if (response.data.status !== "success") {
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        return response.data.data;
    }
    catch (error) {
        console.log("ERROR IN GET ALL QUIZ : ", error.response);
        toast.error(error.response.message);
    }
}
 

export async function setDataForUpdateQuiz(data, navigate,dispatch) {
    
        try {
            
            console.log("set Data : ", data);

            
            dispatch(setData(data));
            toast.success("set data Successfull");
            
            navigate("/quizes/update-quiz");


        } catch (error) {
            console.log("Login ERROR : ", error.response);
            toast.error(error.response.message); 
            
        
        }
}
    

export async function updateQuiz(data,token,navigate) {
    try {
        const response = await apiConnector("PUT", UPDATE_QUIZ_API,
            {
                _id: data._id,
                name: data.name,
                category:data.category,
                questionList: data.questionList,
                answers: data.answers,
                passingPercentage: data.passingPercentage,
                isPublicQuiz: data.isPublicQuiz,
                allowedUser:data.allowedUser
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
         console.log("QUIZ CREATE RESPONSE : ", response);
        if (response.data.status !== "success") {
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        navigate("/quizes/draft");

    }
    catch (error) {
        console.log("ERROR IN UPDATE QUIZ : ", error.response);
        toast.error(error.response.data.message);
    }
}

export async function publishedQuiz(quizId, token, navigate) {
    try {
        const response = await apiConnector("PATCH", PUBLISHED_QUIZ_API,
            {
                quizId:quizId
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("PUBLISHED QUIZ : ", response);
        toast.success(response.data.message);
        navigate("/quizes/published");
    }
    catch (error) {
        console.log("ERROR IN PUBLISHED : ", error.response);
        toast.error(error.response.data.message);
    }
}


export async function allPublishedQuiz(token){
    try {
        const response = await apiConnector("GET", ALL_PUBLISHED_QUIZ_API, null,
            {
              Authorization: `Bearer ${token}`,
           }
        )
        console.log("ALL PUBLISHED QUIZ : ", response);
        toast.success(response.data.message);
        return response.data.data;
    }
    catch (error) {
        console.log("ALL QUIZ FOR EXAM : ", error.response);
        toast.error(error.response.data.message);
    }
}


export async function startExamFetchData(quizId, token) {
    try {
        const response = await apiConnector("GET", START_EXAM_API + quizId, null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("START EXAM RESPPONSE : ", response);
        toast.success(response.data.message);
        return response.data.data;
    }
    catch (error) {
        console.log("ERROR IN START START DATA : ", error.response);
        toast.error(error.response.data.message);
    }
}

export async function submitQuiz(quizId, attemptedQuestion, token) {
    try {
        const response = await apiConnector("POST", SUBMIT_EXAM_API,
            {
                quizId,
                attemptedQuestion
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("SUBMIT QUIZ RESPONSE : ", response);
        toast.success(response.data.message);
        return response.data.data;
    }
    catch (error) {
        console.log("ERROR IN SUBMIT EXAM : ", error.response);
        toast.error(error.response.data.message);
    }
}


export async function addFavouriteQuestion(question, options, token) {
    try {
         
        const response = await apiConnector("POST", ADD_FAVOURITE_QUESTION_API,
            {
                question: question,
                options:options
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        
        console.log("START EXAM RESPPONSE : ", response);
        toast.success(response.data.message);
        
    }
    catch (error) {
        console.log("ERROR IN ADD FAV QUESTION : ", error.response);
        toast.error(error.response.data.message);
    }
}


export async function allReport(token) {
    try {
        const response = await apiConnector("GET", ALL_REPORT_API, null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("ALL REPORT RESPONSE : ", response);
        toast.success(response.data.message);
        return response.data.data;
    }
    catch (error) {
        console.log("ERROR IN ALL REPORT : ", error.response);
        toast.error(error.response.data.message);
    }
}


export async function particularReport(id, token){
    try {
        const response = await apiConnector("GET", PARTICULAR_REPORT_API + id, null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("PARTICULAR REPORT RESPONSE : ", response);
        toast.success(response.data.message);
        return response.data.data;
    }
    catch (error) {
        console.log("ERROR IN PARTICULAR REPORT : ", error.response);
        toast.error(error.response.data.message);
    }
}


export async function allFavouriteQuestions(token) {
    try {
        const response = await apiConnector("GET", SHOW_FAVOURITE_QUESTIONS_API, null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("PARTICULAR REPORT RESPONSE : ", response);
        toast.success(response.data.message);
        return response.data.data.favQues;
    }
    catch (error) {
        console.log("ERROR IN ALL FAV QUES : ", error.response);
        toast.error(error.response.data.message);
    }
}
export async function deleteFavouriteQuestions(id,token,navigate) {
    try {
        const response = await apiConnector("DELETE", DELETE_FAVOURITE_QUESTIONS_API+id, null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("PARTICULAR REPORT RESPONSE : ", response);
        toast.success(response.data.message);
        navigate("/favourite-questions")
    }
    catch (error) {
        console.log("ERROR IN ALL FAV QUES : ", error.response);
        toast.error(error.response.data.message);
    }
}



