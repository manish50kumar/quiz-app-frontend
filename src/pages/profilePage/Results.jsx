import ProfileLeftSidebar from "./ProfileLeftSidebar"
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { allReport } from "../../services/operations/quizAPI";
import { particularReport } from "../../services/operations/quizAPI";


// all report page 
function Results() {
  const [page, setPage] = useState();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [reports, setReports] = useState([]);
  const [showParticularReport, setShowParticularReport] = useState(false);
  const [particularReportData,setParticularReportData] = useState({})

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
    async function fetchData() {
      const response = await allReport(token);
      setReports(response);
    }
    fetchData();
  },[token])
    

  useEffect(() => {
    const matchingComponent = data.find((component) => component.key === page);
    if (matchingComponent) {
      navigate(matchingComponent.path);
    }
  }, [page, navigate, data]);

  const handleOnShowReport = async (id) => {
    const response = await particularReport(id, token);
    setParticularReportData(response);
    setShowParticularReport(true);
  }

  function handleOnBack() {
    console.log("Click")
    setShowParticularReport(false);
    navigate("/quizes/results")
  }

  return (
    <div className="flex h-[86.5vh] bg-slate-500 relative">
      <ProfileLeftSidebar page={page} setPage={setPage} />
      
      <div className="text-center w-full" >
         
        {
          !showParticularReport ?
            (
              <div className="text-white flex flex-col items-center ">
                <h1 className="text-white font-bold text-3xl text-center">All Reports</h1>
                  {
            reports.map((report) => (
                       <div className="border p-7 " >
                            <h2 className="font-medium text-2xl " >Quiz id : {report.quizId} </h2>                            
                            <h2 className="font-medium text-2xl ">Total Question : {report.total} </h2>
                            <h2 className="font-medium text-2xl ">Total Score : {report.score} </h2>
                            <h2 className="font-medium text-2xl ">Percentage : {report.percentage} </h2>
                            <h2 className="font-medium text-2xl ">Result : {report.result} </h2>                
                            <button
                               onClick={()=> handleOnShowReport(report._id)}
                                className="pt-4 pb-4 pr-6 pl-6 bg-blue-500 items-center mt-7  rounded-lg font-bold cursor-pointer"
                              >Show particular report</button>
                      </div>
                    ))
                  }
              </div>
            ):
              (
               <div className='h-screen text-center mt-7 ' >
              <h1 className='font-bold text-2xl ' >  Result </h1> 
                <div className='mt-4' >
                    <h2 className='font-medium text-2xl' >Total Question : {particularReportData.total} </h2>
                    <h2 className='font-medium text-2xl'>Total  Score : {particularReportData.score} </h2>
                    <h2 className='font-medium text-2xl'>Percentage : {particularReportData.percentage} </h2>
                    
                <h2 className='font-medium text-2xl'>Result : {particularReportData.result} </h2> <br />
                 <button
                onClick={handleOnBack}
                 className="pt-4 pb-4 pr-6 pl-6 bg-blue-500 items-center mt-7  rounded-lg font-bold cursor-pointer"
              >Back</button>
              </div>
             
                </div>
              )
        }
         </div>
    </div>
  );
}

export default Results;
