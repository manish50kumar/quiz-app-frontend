


function ProfileLeftSidebar(props) {

   

    return (
        <div className=" w-[35vh] h-full text-white font-medium bg-slate-600 border-r-4 border-blue-500 mb-[30px] ">
               
                <button className="bg-slate-500 pl-6 pt-3 pb-3 text-2xl border rounded-md hover:bg-slate-400 cursor-pointer  w-full text-start  "
                    onClick={() => props.setPage(1)} >
                        Profile
                    </button>
                
                
                <button className="bg-slate-500 pl-6 pt-3 pb-3 text-2xl border rounded-md hover:bg-slate-400 cursor-pointer mt-3  w-full text-start "
                    onClick={() => props.setPage(2)}>
                        Published Quiz
                    </button>
                
               <button className="bg-slate-500 pl-6 pt-3 pb-3 text-2xl border rounded-md hover:bg-slate-400 cursor-pointer mt-3  w-full text-start "
                onClick={() => props.setPage(3)}>
                        Draft Quiz
                    </button>
                
            <button className="bg-slate-500 pl-6 pt-3 pb-3 text-2xl border rounded-md hover:bg-slate-400 cursor-pointer mt-3  w-full text-start "
                onClick={() => props.setPage(4)}>
                        Result
                    </button>
               
            <button className="bg-slate-500 pl-6 pt-3 pb-3 text-2xl border rounded-md hover:bg-slate-400 cursor-pointer mt-3  w-full text-start "
                onClick={() => props.setPage(5)}>
                        Update Profile
                    </button>
                
            <button className="bg-slate-500 pl-6 pt-3 pb-3 text-2xl border rounded-md hover:bg-slate-400 cursor-pointer mt-3  w-full text-start "
                onClick={() => props.setPage(6)}>
                        Change Password
                    </button>
            <button className="bg-slate-500 pl-6 pt-3 pb-3 text-2xl border rounded-md hover:bg-slate-400 cursor-pointer mt-3  w-full text-start "
                onClick={() => props.setPage(8)}>
                        Create Quiz
                    </button>
            {/* <button className="bg-slate-500 pl-6 pt-3 pb-3 text-2xl border rounded-md hover:bg-slate-400 cursor-pointer mt-3  w-full text-start "
                onClick={() => props.setPage(9)}>
                        Update Quiz
                    </button> */}
            <button className="bg-slate-500 pl-6 pt-3 pb-3 text-2xl border rounded-md hover:bg-slate-400 cursor-pointer mt-3  w-full text-start "
                onClick={() => props.setPage(10)}>
                        Favourite Question
                    </button>
               
            <button
                className=" pl-6 pt-3 pb-3 text-2xl border rounded-md bg-slate-200 hover:bg-slate-400 cursor-pointer mt-3  w-full text-start text-red-500 "
                onClick={() => props.setPage(7)}>
                        Deactivate Account
                    </button>
               
            </div>
    )
}

export default ProfileLeftSidebar;
