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
  ], []); 

  
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await userDetails(token);
      
      await setUserData({
        name: result.name,
        email:result.email
      });
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
          <div>
             <h1> User Profile </h1>
            <div><h2>Name :  </h2> <h3> {name} </h3> </div>
            <div><h2>Email :  </h2> <h3> {email} </h3> </div>
         </div>
    </div>
  );
}

export default Profile;
