import { useState } from "react";

export default function TaskCard({
  task,onDelete,onUpdate
}) {

    const [isEditing,setIsEditing] = useState(false);
    const [editedTask,setEditedTask] = useState(
        {
        title: task.title,
        description:
            task.description,
        status:
            task.status,
        });

    const handleEdit = async(taskId)=>{
        
    }


  return (
    <div className="
    bg-white
    rounded-2xl
    shadow-2xl
    p-8
    min-h-[220px]
    hover:shadow-lg
    transition-all
    ">

      {/* Top Row */}
      <div className="flex justify-between items-start">

        <div>
          <h3 className="text-xl font-semibold">
            {task.title}
          </h3>

          <p className="text-gray-600 mt-2">
            {task.description}
          </p>

          <span className="inline-block mt-4 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            {task.status}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-md hover:opacity-80 transition-all">
            Edit
          </button>

          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:shadow-md hover:opacity-80 transition-all"
                  onClick={()=>{onDelete(task._id)}}>
            Delete
          </button>

        </div>

      </div>

    </div>
      
  );
}





