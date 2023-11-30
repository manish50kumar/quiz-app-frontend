


import React, { useState } from 'react';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { startExamFetchData } from "../../services/operations/quizAPI";
import { addFavouriteQuestion } from "../../services/operations/quizAPI";
import { submitQuiz } from '../../services/operations/quizAPI';


// start exam page 
const StartExam = () => {

  const { quizId } = useParams();
  const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
  const [quizData, setQuizData] = useState({});

  const [attemptedQuestions, setAttemptedQuestions] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState({});

  const handleOptionSelect = (questionNumber, selectedOption) => {
    setAttemptedQuestions((prevAttemptedQuestions) => ({
      ...prevAttemptedQuestions,
      [questionNumber]: parseInt(selectedOption, 10),
    }));
    };
    
    useEffect(() => {
        async function fetchData() {
            const data = await startExamFetchData(quizId, token);
            setQuizData(data);
        }
        fetchData();
    },[quizId,token])

  
  // submit exam 
  const handleSubmit = async () => {
    const response =  await submitQuiz(quizId, attemptedQuestions, token);
    // console.log("SETRESULT ", response);
    setResult(response);
      
    // console.log("ANSWER : ", attemptedQuestions);
    setIsSubmit(true);
  };
// add favourite questions
  const handleAddFavourite = async (question, options) => {
    
    await addFavouriteQuestion(question, options, token);
  }
  
  function handleOnBack() {
    navigate("/quizes")
  }

  return (
    <div className="bg-slate-500 text-white h-full w-full ">
          <h1 className='text-4xl text-center font-bold'>Multiple Choice Quiz</h1>
          <h3 className='text-3xl text-center'> Quiz Name : {quizData?.name} </h3>
      
          {
        !isSubmit ? 
             (
                 <div className='flex flex-col items-center '>
              <form className='border mt-5 mb-7' >
        {quizData?.questionList?.map((question) => (
          <div key={question.questionNumber} className="ml-5 mt-4 mr-5 border  text-2xl">
           
            <div className='flex gap-20'>
              <div> {question.questionNumber}. {question.question} </div>
               <button type="button"
                      onClick={()=>handleAddFavourite(question.question , question.options)}
                       className=' pt-2 pb-2 pl-3 pr-3 mr-4 mt-3 bg-blue-600 text-white cursor-pointer   '   
                  >
                 Favourite
                 </button>
            </div>
            <div className="flex flex-col ml-6 mb-3">
             {Object.entries(question.options).map(([optionNumber, optionText]) => (
                <label key={optionNumber}>
                  <input
                    type="radio"
                    name={`question${question.questionNumber}`}
                    value={optionNumber}
                    checked={attemptedQuestions[question.questionNumber] === parseInt(optionNumber, 10)}
                    onChange={() =>
                      handleOptionSelect(question.questionNumber, optionNumber)
                    }
                  />
                  {optionText}
                </label>
              ))}
            </div>
          </div>
        ))}
                  <button type="button"
                      onClick={handleSubmit}
                       className='mt-3 mb-3 pt-3 pb-3 pl-5 pr-5 bg-blue-600 text-white cursor-pointer font-bold ml-[24%] '
   
                  >
          Submit Quiz
        </button>
      </form>
          </div>
            )
            :
            (
                  <div className='h-screen text-center mt-7 ' >
              <h1 className='font-bold text-2xl ' >  Result </h1> 
                <div className='mt-4' >
                    <h2 className='font-medium text-2xl' >Total Question : {result.total} </h2>
                    <h2 className='font-medium text-2xl'>Total  Score : {result.score} </h2>
                    <h2 className='font-medium text-2xl'>Total  attempt : {Object.keys(attemptedQuestions).length} </h2>
                    
                <h2 className='font-medium text-2xl'>Result : {result.result} </h2> <br />
                 <button
                onClick={handleOnBack}
                 className="pt-4 pb-4 pr-6 pl-6 bg-blue-500 items-center mt-7  rounded-lg font-bold cursor-pointer"
              >Back</button>
              </div>
             
                </div>
            )
          }
          

    </div>
  );
};

export default StartExam;




