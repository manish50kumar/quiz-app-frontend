import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateQuiz } from '../../services/operations/quizAPI';


const QuizEditor = () => {
 
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const { data } = useSelector((state) => state.updatequizdetail);

  console.log("slice data in QuizEditor page : ",data.name);

  const [quizData, setQuizData] = useState({
    _id: data._id,
    name: data.name,
    category: data.category,
    questionList: data.questionList,
    answers: data.answers,
    passingPercentage: data.passingPercentage,
    isPublicQuiz: data.isPublicQuiz,
    allowedUser: data.allowedUser
  });

  const [editedQuestion, setEditedQuestion] = useState({
    questionNumber: 0,
    question: "",
    options: {
      1: "",
      2: "",
      3: "",
      4: ""
    },
    answer: 1
  });

  const [editedQuizInfo, setEditedQuizInfo] = useState({
    name: "",
    category: "",
    passingPercentage: 0
  });

  const [action, setAction] = useState('add'); // 'add', 'update', 'remove'

  

  const handleQuestionChange = (event, field) => {
    const value = field === 'questionNumber' ? parseInt(event.target.value, 10) : event.target.value;

    setEditedQuestion(prevQuestion => ({
      ...prevQuestion,
      [field]: value
    }));
  };

  const handleOptionChange = (event, optionNumber) => {
    setEditedQuestion(prevQuestion => ({
      ...prevQuestion,
      options: {
        ...prevQuestion.options,
        [optionNumber]: event.target.value
      }
    }));
  };

  const handleAnswerChange = (event) => {
    setEditedQuestion(prevQuestion => ({
      ...prevQuestion,
      answer: parseInt(event.target.value, 10)
    }));
  };

  const handleQuizInfoChange = (event, field) => {
    const value = event.target.value;

    setEditedQuizInfo(prevInfo => ({
      ...prevInfo,
      [field]: value
    }));
  };

  const handleActionChange = (newAction) => {
    setAction(newAction);

    // Clear the edited question and quiz info when switching actions
    setEditedQuestion({
      questionNumber: 0,
      question: "",
      options: {
        1: "",
        2: "",
        3: "",
        4: ""
      },
      answer: 1
    });

    setEditedQuizInfo({
      name: "",
      category: "",
      passingPercentage: 0
    });
  };



   const [newUser, setNewUser] = useState("");

  const handleIsPublicQuizChange = (event) => {
    const isPublic = event.target.value === 'true';

    setQuizData(prevData => ({
      ...prevData,
      isPublicQuiz: isPublic,
      allowedUser: isPublic ? [] : prevData?.allowedUser || []
    }));
  };

  const handleAllowedUserChange = (event) => {
    setNewUser(event.target.value);
  };

  const handleAddUser = () => {
    setQuizData(prevData => ({
      ...prevData,
      allowedUser: [...prevData.allowedUser, newUser]
    }));
    setNewUser("");
  };

  const performAction = () => {
    let updatedQuizData;

    if (action === 'add') {
      // Add new question to the quizData
      updatedQuizData = {
        ...quizData,
        questionList: [...quizData.questionList, editedQuestion],
        answers: {
          ...quizData.answers,
          [editedQuestion.questionNumber]: editedQuestion.answer
        }
      };
    } else if (action === 'update') {
      // Update an existing question in the quizData
      const updatedQuestionList = quizData.questionList.map(question => {
        if (question.questionNumber === editedQuestion.questionNumber) {
          return editedQuestion;
        }
        return question;
      });

      updatedQuizData = {
        ...quizData,
        questionList: updatedQuestionList,
        answers: {
          ...quizData.answers,
          [editedQuestion.questionNumber]: editedQuestion.answer
        }
      };
    } else if (action === 'remove') {
      // Remove an existing question from the quizData
      const updatedQuestionList = quizData.questionList.filter(question => question.questionNumber !== editedQuestion.questionNumber);

      const updatedAnswers = { ...quizData.answers };
      delete updatedAnswers[editedQuestion.questionNumber];

      updatedQuizData = {
        ...quizData,
        questionList: updatedQuestionList,
        answers: updatedAnswers
      };
    }

    setQuizData(updatedQuizData);
  };

  // const saveToBackend = async () => {
  //     try {
       
  //       if (editedQuizInfo.name !== "") {
  //          await setQuizData(prevData => ({
  //               ...prevData,
  //               name: editedQuizInfo.name
  //         }));
  //       }
  //       if (editedQuizInfo.category !== "") {
  //          await setQuizData(prevData => ({
  //               ...prevData,
  //               category: editedQuizInfo.category
  //         }));
  //       }
  //       if (editedQuizInfo.passingPercentage !== 0) {
  //          await  setQuizData(prevData => ({
  //               ...prevData,
  //               passingPercentage: editedQuizInfo.passingPercentage
  //         }));
  //       }

        
  //        console.log("Quiz Update Data : ",quizData);

    
  //   } catch (error) {
  //     console.error('Error saving data to the backend:', error.message);
  //   }
  // };
  const saveToBackend = async () => {
  try {
    if (editedQuizInfo.name !== "") {
      setQuizData(prevData => ({
        ...prevData,
        name: editedQuizInfo.name
      }));
    }

    if (editedQuizInfo.category !== "") {
      setQuizData(prevData => ({
        ...prevData,
        category: editedQuizInfo.category
      }));
    }

    if (editedQuizInfo.passingPercentage !== 0) {
      setQuizData(prevData => ({
        ...prevData,
        passingPercentage: editedQuizInfo.passingPercentage
      }));
    }

    // Log updated quizData in the callback function
    await setQuizData((updatedQuizData) => {
      // console.log("Updated Quiz Data:", updatedQuizData);

      // Perform other actions here if needed
      updateQuiz(updatedQuizData, token, navigate);

      // return updatedQuizData; // Return the updated state
    });
    
  } catch (error) {
    console.error('Error saving data to the backend:', error.message);
  }
  };

  const handleBack = () => {
      navigate("/quizes/draft")
  }
  
 


  return (
    <div className='flex flex-col  items-center h-full bg-slate-500 text-white'>
      <h2 className='font-bold text-4xl mt-3 mb-6'>Quiz Editor</h2>

      {/* Render input fields for edited quiz info */}
      <label className='text-2xl  '>
        Quiz Name : <span className='ml-3' ></span>
        <input
          type="text"
          value={editedQuizInfo.name}
          onChange={(e) => handleQuizInfoChange(e, 'name')}
          placeholder="Enter Quiz Name"
          className='text-black pt-2 pb-2 pl-4 rounded '
        />
      </label> <br />
      <label className='text-2xl  '>
        Category : <span className='ml-3' ></span>
        <select value={editedQuizInfo.category} onChange={(e) => handleQuizInfoChange(e, 'category')} className='text-black pt-2 pb-2 pl-4 rounded ' >
          <option value="">Select</option>
          <option value="test">Test</option>
          <option value="exam">Exam</option>
        </select>
      </label> <br />
      <label className='text-2xl  ' >
        Passing Percentage : <span className='ml-3' ></span>
        <input
          type="number"
          value={editedQuizInfo.passingPercentage}
          onChange={(e) => handleQuizInfoChange(e, 'passingPercentage')}
          placeholder="Enter Passing Percentage"
          className='text-black pt-2 pb-2 pl-4 rounded '
        />
      </label>
      <br />

      {/* Render controls for isPublicQuiz and allowedUser */}
       <label className='text-2xl  '  >
        Is Public Quiz : <span className='ml-3' ></span>
        <select value={quizData?.isPublicQuiz || false} onChange={handleIsPublicQuizChange} className='text-black pt-2 pb-2 pl-4 rounded '>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </label>

      {!quizData?.isPublicQuiz && (
        <div>
          <label className='text-2xl  '  >
            Add Allowed User : <span className='ml-3' ></span>
            <input
              type="text"
              value={newUser}
              onChange={handleAllowedUserChange}
              placeholder="Enter User ID"
              className='text-black pt-2 pb-2 pl-4 rounded  mr-5'
            />
          </label>
          <button onClick={handleAddUser}  className="bg-blue-500 pt-3 pb-3 pl-5 pr-5 ml-8  mb-4 rounded-lg cursor-pointer  ">Add User</button>
          {/* Render the list of allowed users */}
          <ul>
            {quizData?.allowedUser?.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      )}


      {/* Render controls for selecting action */}
      <h2 className='text-black mt-2 mb-3 font-medium'>Perform Action for Add,Update,Delete Question</h2>
      <label className='text-2xl  ' >
        Action : <span className='ml-3' ></span>
        <select value={action} onChange={(e) => handleActionChange(e.target.value)}  className='text-black pt-2 pb-2 pl-4 rounded '>
          <option value="add">Add Question</option>
          <option value="update">Update Question</option>
          <option value="remove">Remove Question</option>
        </select>
      </label> <br />

      {/* Render input fields for the edited question */}
      
      <label className='text-2xl  '  >
        Question Number : <span className='ml-3' ></span>
        <input
        type="number"
        value={editedQuestion.questionNumber}
        onChange={(e) => handleQuestionChange(e, 'questionNumber')}
        placeholder="Enter Question Number"
        className='text-black pt-2 pb-2 pl-4 rounded  mr-5'
      />
      </label> <br />

      <label className='text-2xl  '>
        Question : <span className='ml-3' ></span>
        <input
        type="text"
        value={editedQuestion.question}
        onChange={(e) => handleQuestionChange(e, 'question')}
          placeholder="Enter Question"
          className='text-black pt-2 pb-2 pl-4 rounded  mr-5'
      />
      </label> <br />

      {[1, 2, 3, 4].map(optionNumber => (
        <label className='text-2xl  '>
          Option {optionNumber} : <span className='ml-3' ></span>
          <input
          key={optionNumber}
          type="text"
          value={editedQuestion.options[optionNumber]}
          onChange={(e) => handleOptionChange(e, optionNumber)}
            placeholder={`Option ${optionNumber}`}
            className='text-black pt-2 pb-2 pl-4 rounded  mr-5 mb-2'
        />
        </label> 
      ))}
      <br />
      <label>
        Correct Answer : <span className='ml-3' ></span>
        <select value={editedQuestion.answer} onChange={handleAnswerChange} className='text-black pt-2 pb-2 pl-4 rounded  mr-5' >
          {[1, 2, 3, 4].map(optionNumber => (
            <option key={optionNumber} value={optionNumber}>
              {`Option ${optionNumber}`}
            </option>
          ))}
        </select>
      </label> <br />

      
      
      {/* Render button to perform the selected action */}
      <button
        onClick={performAction}
         className='mt-3 mb-3 pt-3 pb-3 pl-5 pr-5 bg-blue-600 text-white cursor-pointer font-bold '
   
      >
        Perform Action
      </button>
      <br />

      {/* Render button to save to backend */}
      <button
        onClick={saveToBackend}
         className='mt-3 mb-3 pt-3 pb-3 pl-5 pr-5 bg-blue-600 text-white cursor-pointer font-bold '
   
      >
        Save to Backend
      </button>
      <button
        onClick={handleBack}
         className='mt-3 mb-3 pt-3 pb-3 pl-5 pr-5 bg-blue-600 text-white cursor-pointer font-bold '
   
      >
        Back to Draft
      </button>

      {/* Render the current quiz data */}
      <h3>Current Quiz Data:</h3>
      {/* <pre>{JSON.stringify(quizData, null, 2)}</pre> */}

      <div>
          <h2>  Quiz Name : {quizData.name} </h2>
          <h2>  Quiz Category : {quizData.category} </h2>
          <h2>  Quiz Type : {quizData.isPublicQuiz ? ( <span>Public</span> ):( <span>Private</span> )} </h2>
        <h2>  Passing Percentage : {quizData.passingPercentage} </h2>
        
        <div className="border mb-6 bg-slate-400 " >
                  {
                    quizData.questionList.map((ques, index) => ( 
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
        <h3>Answers : </h3>
         <ul>
                  {Object.entries(quizData.answers).map(([questionNumber, answer]) => (
                    <li key={questionNumber} className="pl-6">
                      {` ${questionNumber}: ${answer}`}
                    </li>
                  ))}
        </ul>
        
        {
       
            <div>
               <h3>Allowed User for private Quiz</h3>
                {
                quizData.allowedUser.map((user, index) => (
                    <h1> user {index+1} : {user} </h1>
                  ))
                }
            </div>
      
        }


      </div>
    </div>
  );
};

export default QuizEditor;
