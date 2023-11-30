

import ProfileLeftSidebar from "./ProfileLeftSidebar"
import React, { useState, useEffect,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { findAllQuiz } from "../../services/operations/quizAPI";
import { useNavigate } from 'react-router-dom';

import {setDataForUpdateQuiz} from "../../services/operations/quizAPI"

import { useDispatch } from "react-redux";

import { publishedQuiz } from "../../services/operations/quizAPI";
import toast from "react-hot-toast";

//  Draft or non published Quizes page 
const QuizList = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [quizzes, setQuizzes] = useState([]);
  // const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuestion, setShowQuestion] = useState(true);

  const [page, setPage] = useState();
  const navigate = useNavigate();

  const data = useMemo(() => [
    {
      key: 1,
      path: "/profile",
    },
    
    {
      key: 2,
      path: "/quizes/published",
    },
    {
      key: 3,
      path: "/quizes/draft",
    },
    {
      key: 4,
      path: "/quizes/results",
    },
    {
      key: 5,
      path: "/profile/update-profile",
    },
    {
      key: 6,
      path: "/profile/change-password",
    },
    {
      key: 7,
      path: "/profile/deactivate",
    },
    {
      key: 8,
      path: "/quizes/create-quiz",
    },
    {
      key: 9,
      path: "/quizes/update-quiz",
    },
  ], []);    
    

  useEffect(() => {
    const matchingComponent = data.find((component) => component.key === page);
    if (matchingComponent) {
      navigate(matchingComponent.path);
    }
  }, [page, navigate, data]);

  useEffect(() => {
    // Fetch quiz data from the backend
    const fetchData = async () => {
      try {
        const response = await findAllQuiz(token); // Replace with your actual API endpoint
        // const data = await response.json();
        // console.log("DATA : ", response);
         setQuizzes(response);
        // if (data.status === 'success' && data.data) {
         
        // } else {
        //   console.error('Failed to fetch quiz data');
        // }
      } catch (error) {
        console.error('Error fetching quiz data:', error.message);
      }
    };

    fetchData();
  }, [token]);

  const handlePublishQuiz = async (quizId) => {
    // Send a request to publish the quiz with the specified quizId
    try {
      publishedQuiz(quizId, token, navigate);
    } catch (error) {
      console.error('Error publishing quiz:', error.message);
    }
  };

  const handleUpdateQuiz = (index) => {
    // Redirect or navigate to the update page with the quiz data at the specified index
    const quizToUpdate = quizzes[index];
    console.log('Navigating to update page with quiz data:', quizToUpdate);
    setDataForUpdateQuiz(quizToUpdate,navigate,dispatch)
    
  };

  const handleDeleteQuiz = (id) => {
    console.log("Delete quiz id : ", id);
    toast.success("Quiz deleted")
  }

  const handleShowQuiz = () => {
    setShowQuestion(!showQuestion);
  }

  return (
    <div className="flex h-screen w-full bg-slate-500 relative">
      <ProfileLeftSidebar page={page} setPage={setPage} />
      
      <div className="flex flex-col   text-white ml-[18%]" >
        <h1 className="text-4xl font-bold mt-4 mb-5 text-center " > Non Published Quiz </h1>
      {quizzes?.map((quiz, index) => (
        // Check if the quiz is not published before rendering
        !quiz?.isPublished && (
          
          <div>
            <div key={quiz._id}  className="border mb-5  " >
              <h2 className="font-medium text-2xl pl-6 pt-3 pr-6 " > Quiz Name :  <span className="font-normal text-1xl " >{quiz.name}</span> </h2> 
                            <h2 className="font-medium text-2xl pl-6 pt-3 pr-6 " > Type :  <span className="font-normal text-1xl " >{quiz.isPublicQuiz ? ( <span>Public</span> ):( <span>Private</span> )}</span> </h2> 
              <h2 className="font-medium text-2xl pl-6 pt-3 pr-6 pb-4" > Total Question :  <span className="font-normal text-1xl  mr-4" >{quiz.questionList.length}</span> <span className="font-normal text-1xl  mr-4">Category :  {quiz.category}</span> <span className="font-normal text-1xl  mr-4">Passing Percentage :  {quiz.passingPercentage} </span>  </h2> 


            <div className="flex mb-5 justify-between">
               <button
              onClick={() => handlePublishQuiz(quiz._id)}
              className="bg-blue-500 pt-3 pb-3 pl-5 pr-5 ml-6  rounded-lg cursor-pointer"
            >
              Publish Quiz
            </button>
            <button
              onClick={() => handleUpdateQuiz(index)}
              className="bg-blue-500 pt-3 pb-3 pl-5 pr-5   rounded-lg cursor-pointer  "
            >
              Update Quiz
            </button>
            <button
              onClick={() => handleDeleteQuiz(quiz._id)}
              className="bg-red-500 pt-3 pb-3 pl-5 pr-5   rounded-lg cursor-pointer  "
            >
              Delete Quiz
            </button>
            <button
              onClick={() => handleShowQuiz()}
              className="bg-blue-500 pt-3 pb-3 pl-5 pr-5  mr-6  rounded-lg cursor-pointer  "
                >
                  {
                    showQuestion ? ( <p> Hide Question </p> ) : ( <p> Show Question </p> )
                 } 
              
            </button>
            </div>
            
          </div >
            {
              showQuestion && (
                <div className="border mb-6 bg-slate-400 " >
                  {
                    quiz.questionList.map((ques, index) => ( 
                      <div className=" p-3" >
                        <h2>{ques.questionNumber}. <span> {ques.question} </span> </h2>
                         <ul>
                  {Object.entries(ques.options).map(([optionNumber, optionText]) => (
                    <li key={optionNumber} className="pl-6">
                      {` ${optionNumber}: ${optionText}`}
                    </li>
                  ))}
                </ul>
                      </div>
                    ))
                  }
                </div>
              )
            }
            </div>
         
        )
      ))}
      </div>
      
      
      </div>
  );
};

export default QuizList;
