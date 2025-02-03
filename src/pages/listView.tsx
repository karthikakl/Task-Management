import * as React from 'react';

interface IListViewProps {}

const ListView: React.FunctionComponent<IListViewProps> = (props) => {
  // State to manage open/close for each dropdown and task options
  const [isTaskListOpen, setIsTaskListOpen] = React.useState(false);
  const [isInProgressOpen, setIsInProgressOpen] = React.useState(false);
  const [isCompletedOpen, setIsCompletedOpen] = React.useState(false);

  const [isMenuOpen, setIsMenuOpen] = React.useState<number | null>(null); // State to track which task's menu is open

  // Toggle functions for dropdowns
  const toggleTaskList = () => setIsTaskListOpen((prev) => !prev);
  const toggleInProgress = () => setIsInProgressOpen((prev) => !prev);
  const toggleCompleted = () => setIsCompletedOpen((prev) => !prev);

  // Toggle for task options menu
  const toggleMenu = (index: number) => {
    setIsMenuOpen(isMenuOpen === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4 text-sm font-semibold bg-gray-100 p-2 rounded-t-lg">
        <div>Task Name</div>
        <div>Date On</div>
        <div>Status</div>
        <div>Category</div>
      </div>
      {/* Task List Dropdown */}
      <div className="border rounded-lg shadow-md">
        <div className="flex rounded-lg justify-between items-center bg-[#FAC3FF] p-2 sm:p-2 md:p-2 lg:p-2">
          <button
            className={'font-medium w-full text-left '}
            onClick={toggleTaskList}
          >
            Todo
          </button>
          <span
            className={`transition-transform ${isTaskListOpen ? 'rotate-180' : ''}`}
          >
            {isTaskListOpen ? '▼' : '>'}
          </span>
        </div>
        {isTaskListOpen && (
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <ul>
              {['Task 1', 'Task 2', 'Task 3'].map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-pink-500 relative"
                >
                  <span>{task}</span>
                  <button
                    onClick={() => toggleMenu(index)}
                    className="text-gray-500"
                  >
                    ...
                  </button>
                  {isMenuOpen === index && (
                    <div className="absolute right-0 bg-white border rounded shadow-md p-2">
                      <button className="block text-blue-500 py-1">Edit</button>
                      <button className="block text-red-500 py-1">Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* In Progress Dropdown */}
      <div className="border rounded-lg shadow-md">
        <div className="flex rounded-lg justify-between items-center bg-[#85D9F1] p-2 sm:p-2 md:p-2 lg:p-2">
          <button
            className={'font-medium w-full text-left'}
            onClick={toggleInProgress}
          >
            In Progress
          </button>
          <span
            className={`transition-transform ${isInProgressOpen ? 'rotate-180' : ''}`}
          >
            {isInProgressOpen ? '▼' : '>'}
          </span>
        </div>
        {isInProgressOpen && (
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <ul>
              {['Task 4', 'Task 5'].map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-blue-500 relative"
                >
                  <span>{task}</span>
                  <button
                    onClick={() => toggleMenu(index)}
                    className="text-gray-500"
                  >
                    ...
                  </button>
                  {isMenuOpen === index && (
                    <div className="absolute right-0 bg-white border rounded shadow-md p-2">
                      <button className="block text-blue-500 py-1">Edit</button>
                      <button className="block text-red-500 py-1">Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Completed Dropdown */}
      <div className="border rounded-lg shadow-md">
        <div className="flex rounded-lg justify-between items-center bg-[#CEFFCC] p-2 sm:p-2 md:p-2 lg:p-2">
          <button
            className={"font-medium w-full text-left"}
            onClick={toggleCompleted}
          >
            Completed
          </button>
          <span
            className={`transition-transform ${isCompletedOpen ? 'rotate-180' : ''}`}
          >
            {isCompletedOpen ? '▼' : '>'}
          </span>
        </div>
        {isCompletedOpen && (
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <ul>
              {['Task 6', 'Task 7'].map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-green-500 relative"
                >
                  <span>{task}</span>
                  <button
                    onClick={() => toggleMenu(index)}
                    className="text-gray-500"
                  >
                    ...
                  </button>
                  {isMenuOpen === index && (
                    <div className="absolute right-0 bg-white border rounded shadow-md p-2">
                      <button className="block text-blue-500 py-1">Edit</button>
                      <button className="block text-red-500 py-1">Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;
