

import ProfileLeftSidebar from "./ProfileLeftSidebar"
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function DraftQuiz() {
  const [page, setPage] = useState();
  const navigate = useNavigate();

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
    const matchingComponent = data.find((component) => component.key === page);
    if (matchingComponent) {
      navigate(matchingComponent.path);
    }
  }, [page, navigate, data]);

  return (
    <div className="flex h-[86.5vh] bg-slate-500 relative">
      <ProfileLeftSidebar page={page} setPage={setPage} />
          <div>
              <h1>This is Draft Page</h1>
      </div>
    </div>
  );
}

export default DraftQuiz;
