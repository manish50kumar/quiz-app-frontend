import ProfileLeftSidebar from "./ProfileLeftSidebar"
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { updateUserDetails } from "../../services/operations/profileAPI";

function UpdateProfile() {
  const [page, setPage] = useState();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");

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

  // handle on change value
  const handleOnChange = (e) => {
    setName(e.target.value);
  }

  // handle on upadate click
  const handleOnClick = (e) => {
    e.preventDefault();
    // console.log(name);

    updateUserDetails(name, token, navigate);

    setName("");
  }

  return (
    <div className="flex h-[86.5vh] bg-slate-500 relative">
      <ProfileLeftSidebar page={page} setPage={setPage} />
          <div className="  pl-[32%] pt-9 text-white">
            <h1 className="font-bold text-3xl pb-6"> Update Profile Name</h1>
        <label htmlFor="name" className="font-medium pr-3">Enter New Name : </label>
        <input
          value={name}
          onChange={handleOnChange}
          type="text"
          className="h-[40px] w-[300px] rounded pl-3 text-black"
          placeholder="Enter your new name"
        />
        <br />

        <button
          className="pt-4 pb-4 pr-6 pl-6 bg-blue-500 items-center mt-7 w-full rounded-lg font-bold"
          onClick={handleOnClick}
        >
          UPDATE
        </button>

         </div>
    </div>
  );
}

export default UpdateProfile;
