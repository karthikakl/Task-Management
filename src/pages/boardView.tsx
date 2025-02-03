import * as React from "react";

interface IBoardViewProps {}

const BoardView: React.FunctionComponent<IBoardViewProps> = (props) => {
  const [showOptions, setShowOptions] = React.useState<string | null>(null);

  const handleOptionsClick = (taskId: string) => {
    setShowOptions(showOptions === taskId ? null : taskId);
  };

  const handleEdit = (taskId: string) => {
    console.log("Edit task:", taskId);
    // Implement your edit logic here
    setShowOptions(null);
  };

  const handleDelete = (taskId: string) => {
    console.log("Delete task:", taskId);
    // Implement your delete logic here
    setShowOptions(null);
  };

  return (
    <div className="p-4">
      {/* Responsive layout for larger screens */}
      <div className="hidden sm:flex gap-4">
        {/* To Do Column */}
        <div className="flex flex-col w-full sm:w-1/3">
          <div className="bg-[#FAC3FF] p-4 rounded shadow-md mb-4">
            <h2 className="font-semibold text-xl mb-2 text-black">To Do</h2>
            <div className="bg-white p-4 rounded shadow-sm mb-2 relative">
              <p>Task 1</p>
              <button
                onClick={() => handleOptionsClick("task1")}
                className="absolute top-2 right-2 text-gray-600"
              >
                &#x22EE;
              </button>
              {showOptions === "task1" && (
                <div className="absolute right-2 top-8 bg-white border border-gray-300 shadow-lg rounded-md">
                  <button onClick={() => handleEdit("task1")} className="p-2">Edit</button>
                  <button onClick={() => handleDelete("task1")} className="p-2 text-red-600">Delete</button>
                </div>
              )}
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-2 relative">
              <p>Task 2</p>
              <button
                onClick={() => handleOptionsClick("task2")}
                className="absolute top-2 right-2 text-gray-600"
              >
                &#x22EE;
              </button>
              {showOptions === "task2" && (
                <div className="absolute right-2 top-8 bg-white border border-gray-300 shadow-lg rounded-md">
                  <button onClick={() => handleEdit("task2")} className="p-2">Edit</button>
                  <button onClick={() => handleDelete("task2")} className="p-2 text-red-600">Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* In Progress Column */}
        <div className="flex flex-col w-full sm:w-1/3">
          <div className="bg-[#85D9F1] p-4 rounded shadow-md mb-4">
            <h2 className="font-semibold text-xl mb-2 text-black">In Progress</h2>
            <div className="bg-white p-4 rounded shadow-sm mb-2 relative">
              <p>Task 3</p>
              <button
                onClick={() => handleOptionsClick("task3")}
                className="absolute top-2 right-2 text-gray-600"
              >
                &#x22EE;
              </button>
              {showOptions === "task3" && (
                <div className="absolute right-2 top-8 bg-white border border-gray-300 shadow-lg rounded-md">
                  <button onClick={() => handleEdit("task3")} className="p-2">Edit</button>
                  <button onClick={() => handleDelete("task3")} className="p-2 text-red-600">Delete</button>
                </div>
              )}
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-2 relative">
              <p>Task 4</p>
              <button
                onClick={() => handleOptionsClick("task4")}
                className="absolute top-2 right-2 text-gray-600"
              >
                &#x22EE;
              </button>
              {showOptions === "task4" && (
                <div className="absolute right-2 top-8 bg-white border border-gray-300 shadow-lg rounded-md">
                  <button onClick={() => handleEdit("task4")} className="p-2">Edit</button>
                  <button onClick={() => handleDelete("task4")} className="p-2 text-red-600">Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Complete Column */}
        <div className="flex flex-col w-full sm:w-1/3">
          <div className="bg-[#CEFFCC] p-4 rounded shadow-md mb-4">
            <h2 className="font-semibold text-xl mb-2 text-black">Complete</h2>
            <div className="bg-white p-4 rounded shadow-sm mb-2 relative">
              <p>Task 5</p>
              <button
                onClick={() => handleOptionsClick("task5")}
                className="absolute top-2 right-2 text-gray-600"
              >
                &#x22EE;
              </button>
              {showOptions === "task5" && (
                <div className="absolute right-2 top-8 bg-white border border-gray-300 shadow-lg rounded-md">
                  <button onClick={() => handleEdit("task5")} className="p-2">Edit</button>
                  <button onClick={() => handleDelete("task5")} className="p-2 text-red-600">Delete</button>
                </div>
              )}
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-2 relative">
              <p>Task 6</p>
              <button
                onClick={() => handleOptionsClick("task6")}
                className="absolute top-2 right-2 text-gray-600"
              >
                &#x22EE;
              </button>
              {showOptions === "task6" && (
                <div className="absolute right-2 top-8 bg-white border border-gray-300 shadow-lg rounded-md">
                  <button onClick={() => handleEdit("task6")} className="p-2">Edit</button>
                  <button onClick={() => handleDelete("task6")} className="p-2 text-red-600">Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stacked version for smaller screens */}
      <div className="sm:hidden">
        {/* Same as above, just stack the elements */}
      </div>
    </div>
  );
};

export default BoardView;
