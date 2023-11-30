import React, { useState } from 'react';
import { createQuiz } from "../../services/operations/quizAPI"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


// create quiz page 
const QuizForm = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const initialQuestion = {
    questionNumber: 1,
    question: "",
    options: {
      1: "",
      2: "",
      3: "",
      4: ""
    },
    answer: 1 // Default answer
  };

  const [quizDetails, setQuizDetails] = useState({
    name: "",
    category: "",
    questionList: [],
    answers: {},
    passingPercentage: 60,
    isPublicQuiz: false,
    allowedUser: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({ ...initialQuestion });

  const handleAddQuestion = () => {
    // Validate if question, options, question number, answer, category, and passing percentage are filled
    if (
      quizDetails.name.trim() === '' ||
      currentQuestion.question.trim() === '' ||
      Object.values(currentQuestion.options).some(option => option.trim() === '') ||
      currentQuestion.questionNumber === 0 ||
      currentQuestion.answer === 0 ||
      quizDetails.category === '' ||
      quizDetails.passingPercentage === 0
    ) {
      alert('Please fill in all fields for the current question.');
      return;
    }

    setQuizDetails(prevDetails => ({
      ...prevDetails,
      questionList: [...prevDetails.questionList, currentQuestion],
      answers: {
        ...prevDetails.answers,
        [currentQuestion.questionNumber]: currentQuestion.answer
      }
    }));

    setCurrentQuestion({ ...initialQuestion });
    
  };

  const handleInputChange = (event, field) => {
    const value = field === 'questionNumber' ? parseInt(event.target.value, 10) : event.target.value;

    if (field === 'name') {
      setQuizDetails(prevDetails => ({
        ...prevDetails,
        [field]: value
      }));
    } else {
      setCurrentQuestion(prevQuestion => ({
        ...prevQuestion,
        [field]: value
      }));
    }
  };

  const handleOptionChange = (event, optionNumber) => {
    setCurrentQuestion(prevQuestion => ({
      ...prevQuestion,
      options: {
        ...prevQuestion.options,
        [optionNumber]: event.target.value
      }
    }));
  };

  const handleAnswerChange = (event) => {
    setCurrentQuestion(prevQuestion => ({
      ...prevQuestion,
      answer: parseInt(event.target.value, 10)
    }));
  };

  const handleCategoryChange = (event) => {
    setQuizDetails(prevDetails => ({
      ...prevDetails,
      category: event.target.value
    }));
  };

  const handlePassingPercentageChange = (event) => {
    setQuizDetails(prevDetails => ({
      ...prevDetails,
      passingPercentage: parseInt(event.target.value, 10)
    }));
  };

  const handleIsPublicChange = (event) => {
    setQuizDetails(prevDetails => ({
      ...prevDetails,
      isPublicQuiz: event.target.checked,
      allowedUser: event.target.checked ? [] : prevDetails.allowedUser // Clear allowedUser if isPublicQuiz is true
    }));
  };

  const handleAllowedUserChange = (event, index) => {
    const updatedAllowedUser = [...quizDetails.allowedUser];
    updatedAllowedUser[index] = event.target.value;
    setQuizDetails(prevDetails => ({
      ...prevDetails,
      allowedUser: updatedAllowedUser
    }));
  };

  const addAllowedUserInput = () => {
    setQuizDetails(prevDetails => ({
      ...prevDetails,
      allowedUser: [...prevDetails.allowedUser, ""]
    }));
  };

  const sendDataToBackend = async () => {
    try {
      // Add your logic to send quizDetails to the backend API
      // console.log('Sending data to backend:', quizDetails);

      await createQuiz(quizDetails, token, navigate);

    } catch (error) {
      console.error('Error sending data to the backend:', error.message);
    }
  };

  return (
    <div className='flex flex-col bg-slate-400  box-border w-full h-full items-center'>
      <h1 className='text-white font-bold text-4xl mt-3 mb-5'>Create Quiz</h1>
      <label className='text-white font-medium text-2xl'>
        Quiz Name :
        <input
          type="text"
          value={quizDetails.name}
          onChange={(e) => handleInputChange(e, 'name')}
          placeholder="Enter Quiz Name"
          className='text-black rounded p-3 ml-4 mb-4'
        />
      </label>

       <label className='text-white font-medium text-2xl' >
        Category:
        <select value={quizDetails.category} onChange={handleCategoryChange} className='text-black rounded p-3 ml-4 mb-4' >
          <option value="">Select Category</option>
          <option value="test">Test</option>
          <option value="exam">Exam</option>
        </select>
      </label>

      <label className='text-white font-medium text-2xl'>
        Passing Percentage:
        <input
          type="number"
          value={quizDetails.passingPercentage}
          onChange={handlePassingPercentageChange}
          placeholder="Enter Passing Percentage"
          className='text-black rounded p-3 ml-4 mb-4'
        />
      </label>

      
      <label className='text-white font-medium text-2xl'>
        Is Public Quiz:
        <input type="checkbox" checked={quizDetails.isPublicQuiz} onChange={handleIsPublicChange}
          className='text-black rounded p-3 ml-4 mb-4'
        />
      </label>

      {!quizDetails.isPublicQuiz && (
        <div>
          <label className='text-white font-medium text-2xl mb-4' >Allowed Users:</label>
          {quizDetails.allowedUser.map((user, index) => (
            <div key={index}>
              <input
                type="text"
                value={user}
                onChange={(e) => handleAllowedUserChange(e, index)}
                placeholder="Enter Allowed User"
                className='text-black rounded p-3 ml-4 mb-4 mt-4'
              />
            </div>
          ))}
          <button
            onClick={addAllowedUserInput}
            className='mt-3 mb-3 pt-3 pb-3 pl-5 pr-5 bg-blue-600 text-white cursor-pointer font-bold '
          >
            Add Allowed User
          </button>
        </div>
      )}
      <br />

      <label className='text-white font-medium text-2xl' >
        Question Number : 
        <input
        type="number"
        value={currentQuestion.questionNumber}
        onChange={(e) => handleInputChange(e, 'questionNumber')}
          placeholder="Enter Question Number"
          className='text-black rounded p-3 ml-4 mb-4'
      />
      </label>
      <label className='text-white font-medium text-2xl'  >
        Question :
        <input
        type="text"
        value={currentQuestion.question}
        onChange={(e) => handleInputChange(e, 'question')}
          placeholder="Enter Question"
          className='text-black rounded p-3 ml-4 mb-4'
      />
      </label>
      {[1, 2, 3, 4].map(optionNumber => (
        <label className='text-white font-medium text-2xl' >
          Option {optionNumber} : 
          <input
          key={optionNumber}
          type="text"
          value={currentQuestion.options[optionNumber]}
          onChange={(e) => handleOptionChange(e, optionNumber)}
            placeholder={`Option ${optionNumber}`}
            className='text-black rounded p-3 ml-4 mb-4'
        />
        </label>
      ))}
      <label className='text-blue-600 font-medium text-2xl pb-4'>
        Correct Answer :
        <select value={currentQuestion.answer} onChange={handleAnswerChange}>
          {[1, 2, 3, 4].map(optionNumber => (
            <option key={optionNumber} value={optionNumber} className='text-black rounded p-3 ml-4 mb-4'>
              {`Option ${optionNumber}`}
            </option>
          ))}
        </select>
      </label>

     

      


      <button
        onClick={handleAddQuestion}
        className='mt-3 mb-3 pt-3 pb-3 pl-5 pr-5 bg-blue-600 text-white cursor-pointer font-bold '
    
      >
        Add Question
      </button>
      <br />
      <button
        onClick={sendDataToBackend}
        className='mt-3 mb-3 pt-3 pb-3 pl-5 pr-5 bg-blue-600 text-white cursor-pointer font-bold '
    
      >
        Send Data to Backend
      </button>
    </div>
  );
};

export default QuizForm;
