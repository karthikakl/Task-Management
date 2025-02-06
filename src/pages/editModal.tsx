import * as React from 'react';
import { useState } from 'react';


interface IEditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditModal: React.FunctionComponent<IEditModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [taskStatus, setTaskStatus] = useState<string>('pending');
    const [file, setFile] = useState<File | null>(null);
    const [activityLog, setActivityLog] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleTaskUpdate = () => {
        addActivity('Task updated');
    };

    const addActivity = (action: string) => {
        setActivityLog((prevLogs) => [action, ...prevLogs]);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-2/3 animate-fadeIn relative flex flex-col sm:flex-row">
                {/* Left section - Task form */}
                <div className="w-full sm:w-2/3 mb-4 sm:mb-0">
                    <h2 className="text-xl font-bold mb-4">Edit Task</h2>

                    <input
                        type="text"
                        placeholder="Task Title"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800"
                    />

                    <textarea
                        placeholder="Task Description"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800"
                    ></textarea>

                    {/* Task Category, Due Date, Task Status - Same Line */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {/* Task Category */}
                        <div>
                            <label className="block mb-1 text-sm font-light">Task Category*</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedCategory('work')}
                                    className={`w-full p-2 border rounded-3xl ${selectedCategory === 'work' ? 'bg-purple-800 text-white' : 'bg-gray-200'}`}
                                >
                                    Work
                                </button>
                                <button
                                    onClick={() => setSelectedCategory('personal')}
                                    className={`w-full p-2 border rounded-3xl ${selectedCategory === 'personal' ? 'bg-purple-800 text-white' : 'bg-gray-200'}`}
                                >
                                    Personal
                                </button>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block mb-1 text-sm font-light">Due Date*</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800"
                            />
                        </div>

                        {/* Task Status */}
                        <div>
                            <label className="block mb-1 text-sm font-light">Task Status*</label>
                            <select
                                value={taskStatus}
                                onChange={(e) => setTaskStatus(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* File Upload Section */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium">Attachment</label>
                        <div className="border-dashed border-2 border-gray-300 p-4 text-center rounded-md">
                            <p className="text-sm mb-2">{file ? `File: ${file.name}` : "Drop your files here or click to browse"}</p>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                id="fileInput"
                            />
                            <label
                                htmlFor="fileInput"
                                className="px-4 py-2 bg-purple-800 text-white rounded-md cursor-pointer hover:bg-gray-600"
                            >
                                {file ? "Update File" : "Choose File"}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right section - Activity Log */}
                <div className="w-full sm:w-1/3 sm:pl-6 sm:border-l border-gray-300">
                    <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
                    <div className="h-64 overflow-y-auto">
                        {activityLog.length === 0 ? (
                            <p>No activities yet...</p>
                        ) : (
                            activityLog.map((log, index) => (
                                <div key={index} className="mb-2">
                                    <p className="text-sm text-gray-700">{log}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Bottom button container */}
                <div className="absolute bottom-4 right-4 flex gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 h-12 bg-gray-300 rounded-3xl hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleTaskUpdate}
                        className="px-4 py-2 h-12 bg-purple-800 text-white rounded-3xl hover:bg-gray-600"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
