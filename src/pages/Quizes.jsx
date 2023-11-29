import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allPublishedQuiz } from "../services/operations/quizAPI";
import { useNavigate } from "react-router-dom";

function Quizes() {
    const { token } = useSelector((state) => state.auth);
    const [quizes, setQuizes] = useState();
    // const [showQuestion, setShowQuestion] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
         async function fetchData() {    
             const data = await allPublishedQuiz(token);             
             setQuizes(data);            
          }
        fetchData();      
    }, [token])
    
    const handleStartQuiz = (quizId) => {
        navigate("/exam/" + quizId);
    }

    return (
    <div className="flex h-screen w-full bg-slate-500 relative">
      {/* <ProfileLeftSidebar page={page} setPage={setPage} /> */}
      <div className="flex flex-col   text-white ml-[18%]" >
        <h1 className="text-4xl font-bold mt-4 mb-5 text-center "  >  Quiz </h1>
      {quizes?.map((quiz, index) => (
        // Check if the quiz is not published before rendering
         (
          
          <div>
            <div key={quiz._id}   className="border mb-5  " >
               <h2 className="font-medium text-2xl pl-6 pt-3 pr-6 pb-4 mt-4" > Quiz Name :  <span className="font-normal text-1xl " >{quiz.name}</span> </h2> 
                <h2 className="font-medium text-2xl pl-6 pt-3 pr-6 " > Type :  <span className="font-normal text-1xl " >{quiz.isPublicQuiz ? ( <span>Public</span> ):( <span>Private</span> )}</span> </h2> 
              <h2 className="font-medium text-2xl pl-6 pt-3 pr-6 pb-4" > Total Question :  <span className="font-normal text-1xl  mr-4" >{quiz.questionList.length}</span> <span className="font-normal text-1xl  mr-4">Category :  {quiz.category}</span> <span className="font-normal text-1xl  mr-4">Passing Percentage :  {quiz.passingPercentage} </span>  </h2> 


            <button
              onClick={() => handleStartQuiz(quiz._id)}
              className="bg-blue-500 pt-3 pb-3 pl-5 pr-5 mb-4 rounded-lg cursor-pointer mt-4 ml-[36%] "
            >
                
                   start quiz
                
            </button>

            
          </div>

          {/* {
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
            } */}
            </div>

         
        )
      ))}
      </div>

       
      </div>
  )
}

export default Quizes;