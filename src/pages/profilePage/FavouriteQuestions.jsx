
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allFavouriteQuestions } from "../../services/operations/quizAPI";
import { deleteFavouriteQuestions } from "../../services/operations/quizAPI";
import { useNavigate } from "react-router-dom";


// all favourite question page
function FavouriteQuestions() {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await allFavouriteQuestions(token);
            setQuestions(response);
        }
        fetchData();
    }, [token])
    
    async function handleRemoveFavourite(id) {
        console.log(id);
        await deleteFavouriteQuestions(id, token, navigate);
        const response = await allFavouriteQuestions(token);
            setQuestions(response);
    }

    return (
        <div className="h-screen w-full bg-slate-500">
             <div className='flex flex-col items-center mb-6 '>
             
        {questions?.map((question,index) => (
          <div key={question._id} className="ml-5 mt-4 mr-5 border text-white  text-2xl">
           
            <div className='flex gap-20'>
              <p className="mt-3 ml-2">  {question.question} </p>
               <button type="button"
                      onClick={()=>handleRemoveFavourite(question._id)}
                       className=' pt-2 pb-2 pl-3 pr-3 mr-4 mt-3 bg-blue-600 text-white cursor-pointer   '   
                  >
                 Remove
                 </button>
            </div>
            <div className="flex flex-col ml-6 mb-3">
             {Object.entries(question.options).map(([optionNumber, optionText]) => (
                <p> {optionNumber}. {optionText} </p>
              ))}
            </div>
          </div>
        ))}
                  
     
          </div>
        </div>
    )
}

export default FavouriteQuestions;