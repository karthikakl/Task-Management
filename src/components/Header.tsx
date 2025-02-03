import React, { useContext, useState, useEffect } from "react";
import { useUserAuth } from "../context/userAuthContext";
import { AuthContext, FirebaseContext } from "../store/Context";
import { getAuth } from "firebase/auth";
import ListView from "../pages/listView";
import BoardView from "../pages/boardView";

const Header: React.FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const firebaseContext = useContext(FirebaseContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<'list' | 'board'>('list');
  const [isMobile, setIsMobile] = useState(false); // Track screen size

  if (!authContext || !firebaseContext) {
    return <p>Loading...</p>;
  }

  const { user } = authContext;
  const { app } = firebaseContext;

  const auth = getAuth(app);
  const { logout } = useUserAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewChange = (view: 'list' | 'board') => {
    setActiveView(view);
  };

  // Check screen size for mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // You can adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add event listener for resizing
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b border-gray-300">
        {/* Left side: Task Buddy, List, Board, Filter */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-4">Task Buddy</h3>

          {/* Hide view switch buttons on mobile */}
          {!isMobile && (
            <div className="flex flex-row gap-4">
              <button
                onClick={() => handleViewChange("list")}
                className={`sm:w-auto ${activeView === "list" ? "underline" : "no-underline"}`}
              >
                List
              </button>
              <button
                onClick={() => handleViewChange("board")}
                className={`sm:w-auto ${activeView === "board" ? "underline" : "no-underline"}`}
              >
                Board
              </button>
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row">
            <p className="p-2">Filter by:</p>
            <select className="bg-slate-100 p-2 rounded-3xl border border-gray-300 w-full sm:w-auto">
              <option value="">Category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>

            <select className="bg-slate-100 p-2 rounded-3xl border border-gray-300 w-full sm:w-auto">
              <option value="">Due Date</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
            </select>
          </div>
        </div>

        {/* Right side: Profile, Logout, Search, Add Task */}
        <div className="flex flex-col gap-4">
          {/* Profile photo and name */}
          <div className="flex items-center gap-4 sm:flex-row-reverse flex-col">
            {user?.photoURL ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  onError={() => console.log("Error loading image:", user.photoURL)}
                />
              </div>
            ) : (
              <p>No profile photo</p>
            )}
            <span className="font-semibold hidden sm:block">{user?.displayName || "Guest"}</span>
          </div>

          {/* Logout button */}
          <button
            onClick={logout}
            className="text-black sm:px-4 sm:py-2 ml-auto mr-4"
          >
            Logout
          </button>

          {/* Search input and Add Task button */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tasks"
              className="px-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            />

            <button
              onClick={() => console.log("Add Task clicked")}
              className="bg-purple-700 text-white px-4 py-2 rounded-3xl mt-4 sm:mt-0 sm:ml-4 hover:bg-green-700 w-full sm:w-auto"
            >
              Add Task
            </button>
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* Always show ListView on mobile */}
        {isMobile || activeView === 'list' ? (
          <ListView />
        ) : (
          <BoardView />
        )}
      </div>
    </div>
  );
};

export default Header;
