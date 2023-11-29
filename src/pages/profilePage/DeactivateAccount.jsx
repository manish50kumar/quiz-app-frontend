import ProfileLeftSidebar from "./ProfileLeftSidebar"
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deactivatUserAccount } from "../../services/operations/profileAPI";

function DeactivateAccount() {
  const [page, setPage] = useState();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

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
  
  async function handleOnYES() {
      await deactivatUserAccount(token,navigate)
   }
    

  useEffect(() => {
    const matchingComponent = data.find((component) => component.key === page);
    if (matchingComponent) {
      navigate(matchingComponent.path);
    }
  }, [page, navigate, data]);

  return (
    <div className="flex h-[86.5vh] bg-slate-500 relative text-white">
      <ProfileLeftSidebar page={page} setPage={setPage} />
          <div className="flex flex-col items-center">
        <h1> Deactivate Account</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam numquam voluptatum eveniet mollitia cumque consequuntur tempora tenetur? Error consequatur eos delectus, sed adipisci ullam nemo id. Ut voluptatibus laborum, ipsam placeat repellendus nobis molestiae. Vitae dicta sed minus repellendus quibusdam neque, eveniet fuga, asperiores ratione odit corrupti unde delectus ex!</p>
               <div>
          <div>
            <br />
            <h2>Are You Sure ?</h2>
            <button
            className="pt-4 pb-4 pr-6 pl-6 bg-blue-500 items-center mt-7 w-full rounded-lg font-bold"
              onClick={handleOnYES}
            >YES</button>
                    </div>
              </div>
      </div>
    </div>
  );
}

export default DeactivateAccount;
