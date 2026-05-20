import { useState } from "react";

export default function TaskCard({
  task,onDelete,onUpdate
}) {

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const [isEditing,setIsEditing] = useState(false);
    const [editedTask,setEditedTask] = useState(
        {
        title: task.title,
        description:
            task.description,
        status:
            task.status,
        });


    const handleChange =
      (e) => {

        setEditedTask(prev => ({
          ...prev,
          [e.target.name]:
            e.target.value,
        }));
      };

    const handleEdit = async()=>{
        try{
          setLoading(true);
          setError("");
          const token = localStorage.getItem("token");

          const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task._id}`,
              {
                method:"PUT",
                headers:{
                  "Content-Type":"application/json",
                  Authorization:`Bearer ${token}`,
                },
                body:JSON.stringify(editedTask),
              }
          );

          const data = await response.json();
          if(!response.ok){
            throw new Error(data.message);
          }

          onUpdate(data.task);
          setIsEditing(false);
      
        }catch(error){
          setError(
              error.message
          );
        }finally{
          setLoading(false);
        }
    };




  return (
  <div className=" bg-white rounded-2xl shadow-2xl p-8 hover:shadow-lg transition-all " >

    {isEditing ? (

      <div className="space-y-5">

        <h2 className="text-2xl font-semibold">
          Edit Task
        </h2>

        {error && (
          <p className=
          "text-red-500 text-sm">
              {error}
          </p>
      )}

        {/* Title */}
        <input
          type="text"
          name = "title"
          placeholder="Task title"
          value={editedTask.title}
          onChange = {handleChange}
          className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-blue-400
          "
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Task description"
          rows={5}
          value={editedTask.description}
          onChange={handleChange}
          className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          outline-none
          resize-none
          focus:ring-2
          focus:ring-blue-400
          "
        />

        {/* Status */}
        <select
          name="status"
          value={editedTask.status}
          onChange={handleChange}
          className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          outline-none
          focus:ring-2
         focus:ring-blue-400
          "
        >
          <option value="pending">
            Pending
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            onClick={() => {

              setEditedTask({
                title:
                  task.title,
                description:
                  task.description,
                status:
                  task.status,
              });

              setIsEditing(
                false
              );
            }}
            className="
            border
            px-5
            py-2
            rounded-lg
            hover:bg-gray-100
            transition-all
            "
          >
            Cancel
          </button>

          <button
            className="
            bg-black
            text-white
            px-5
            py-2
            rounded-lg
            hover:opacity-80
            transition-all
            "
            onClick={handleEdit}
            disabled={ !editedTask.title.trim() || loading }
          >
          {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    ) : (

      <div className="flex justify-between items-start">

        <div>
          <h3 className="text-xl font-semibold">
            {task.title}
          </h3>

          <p className="text-gray-600 mt-2">
            {task.description}
          </p>

          <span className="
          inline-block
          mt-4
          bg-yellow-100
          text-yellow-700
          px-3
          py-1
          rounded-full
          text-sm
          ">
            {task.status}
          </span>
        </div>

        <div className="flex gap-2">

          <button
            className="
            bg-blue-500
            text-white
            px-4
            py-2
            rounded-lg
            hover:shadow-md
            hover:opacity-80
            transition-all
            "
            onClick={() => {

              setEditedTask({
                title:
                  task.title,
                description:
                  task.description,
                status:
                  task.status,
              });

              setIsEditing(
                true
              );
            }}
          >
            Edit
          </button>
 
          <button
            className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-lg
            hover:shadow-md
            hover:opacity-80
            transition-all
            "
            onClick={() =>
              onDelete(task._id)
            }
          >
            Delete
          </button>

        </div>

      </div>

    )}

  </div>
);
}





