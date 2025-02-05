import * as React from 'react';

interface IEditModalProps {
    isOpen:boolean,
    onClose:()=>void
}

const EditModal: React.FunctionComponent<IEditModalProps> = ({isOpen,onClose}) => {
    if(!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fadeIn relative">
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                
                <input 
                    type="text" 
                    placeholder="Task Title" 
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <textarea
                    placeholder="Task Description"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Task</button>
                </div>
            </div>
        </div>
  )
};

export default EditModal;
