import ProfileLeftSidebar from "./ProfileLeftSidebar"
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
  const [page, setPage] = useState();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [questionList, setQuestionList] = useState(
        {
            questionNumber: 0,
            questions: "",
            options: {
                1: "",
                2: "",
                3: "",
                4: ""
            }
        }
    );
    const [answers, setAnswers] = useState({});
    const [passingPercentage, setPassingPercentage] = useState();
    const [isPublicQuiz, setIsPublicQuiz] = useState(true);
    const [allowedUser, setAllowedUser] = useState([]);

    // ADD question condition
    const [isAddCourse,setIsAddCourse] = useState(false); 

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
  ], []);    
    

  useEffect(() => {
    const matchingComponent = data.find((component) => component.key === page);
    if (matchingComponent) {
      navigate(matchingComponent.path);
    }
  }, [page, navigate, data]);
    
    // handle on name change
    const handleOnNameChange = (e) => {
        setName(e.target.value);
    }
    
    const handleOnCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleOnQuizTypeChange = (e) => {
        setIsPublicQuiz(e.target.value);
    }

    function handleOnAddQuestion() {
        console.log("click button")
        setIsAddCourse(true);
    }
    function handleOnAddQuestionSubmit() {
        console.log("click button false")
        setIsAddCourse(false);
    }

    // useEffect(() => {
    //     console.log("effect")
    // },[isAddCourse])

  return (
    <div className="flex h-[86.5vh] bg-slate-500 relative">
      <ProfileLeftSidebar page={page} setPage={setPage} />
          <div className=" text-white flex flex-col items-center ml-[35%] mt-5 ">
              <h1 className="font-bold text-4xl"> Create  Quiz </h1>
              <label htmlFor="name mb-4">Name : </label> 
              <input type="text"
                  value={name}
                  name="name"
                  onChange={handleOnNameChange}
                   className="text-black"
              />
              <br />

              <h3 > Category </h3>
              <div>
                  <label htmlFor="exam" className="ml-3">exam</label>
              <input type="radio" name="category" value="exam" onChange={handleOnCategoryChange} className="ml-3"/>
              <label htmlFor="text" className="ml-3">test</label>
              <input type="radio" name="category" value="test" onChange={handleOnCategoryChange} className="ml-3"/>
              </div>
              <label htmlFor="passingPercentage">Passing Percentage</label>
              <input
                  type="text"
                  className="text-black"
              />
              <br />
              <label htmlFor="publicQuiz">  Quiz Tupe Public or Private</label>
              <div>
                 <label htmlFor="exam" className="ml-3">public</label>
              <input type="radio" name="isPublicQuiz" value={true} onChange={handleOnQuizTypeChange} className="ml-3"/>
              <label htmlFor="text" className="ml-3">private</label>
              <input type="radio" name="isPublicQuiz" value={false} onChange={handleOnQuizTypeChange} className="ml-3"/>
              </div>

              <h2>if Private then Allow user details</h2>

              <button className="p-5 font-bold bg-blue-600 " onClick={handleOnAddQuestion} > ADD QUESTION </button>
              
              {
                  !isAddCourse ? ( <div><h1>Click for add Question </h1></div> )
                       : 
              ( <div>
               
                  <h1>add question </h1>
                  <input type="text" />
                  <button className="p-5 font-bold bg-blue-600 " onClick={handleOnAddQuestionSubmit} > ADD  </button>
              
              </div> )

              }

             
              
          </div>
    </div>
  );
}

export default CreateQuiz;
