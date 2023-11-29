import ProfileLeftSidebar from "./profilePage/ProfileLeftSidebar";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {userDetails} from "../services/operations/profileAPI"

function Profile() {
  const [page, setPage] = useState();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    name: "",
    email:""
  });
  const { name, email } = userData;

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
    {
      key: 10,
      path: "/favourite-questions",
    },
  ], []); 

  
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await userDetails(token);
      
      if (result) {
         await setUserData({
        name: result.name,
        email:result.email
      });
      }
      else {
        await setUserData({
        name: "name not found",
        email:"Email not found"
      });
      }
      // console.log(" USER : ", userData);
    };

    fetchData();
  }, [token]);
    

  useEffect(() => {

    const matchingComponent = data.find((component) => component.key === page);
    if (matchingComponent) {
      navigate(matchingComponent.path);
    }
  }, [page, navigate, data]);

  return (
    <div className="flex h-[86.5vh] bg-slate-500 relative">
          <ProfileLeftSidebar page={page} setPage={setPage} />
          
       <div className="flex flex-col justify-center items-center pl-[20%]">
        <div className="border-2 border-slate-300  text-white w-[40vw]">
                 <h1 className="pt-6 pl-[30%] pb-6 font-bold text-4xl" > User Profile </h1>
                  <h2 className="pl-7 font-medium text-3xl">Name : <span className="text-2xl font-normal">{name}</span>  </h2>
                  <h2 className="pl-7 font-medium text-3xl pb-5">Email : <span className="text-2xl font-normal">{email}</span>  </h2>
                
                 
         </div>
           
       </div>
    </div>
  );
}

export default Profile;
