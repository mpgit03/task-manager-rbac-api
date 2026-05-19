'use client';

import DashboardHeader
from "@/components/DashboardHeader";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/Taskform";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [loading,setLoading] = useState(false);
  const [tasks,
        setTasks] =
        useState([]);

  useEffect(() => {

  const fetchTasks =
    async () => {

      try {
        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message
          );
        }

        setTasks(data.tasks);

      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

  fetchTasks();

}, []);

const handleDelete = async(taskId)=>{
      try{
        setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        {
          method:"DELETE",
          headers:{
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message);
      }
      setTasks(
            prev =>
              prev.filter(
                task =>
                  task._id
                  !== taskId
              )
            );

      alert(data.message);
        
        }
      catch(error){
        alert(error.message);
      }
      finally{
        setLoading(false);
      }
      
      
      
}


    return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <DashboardHeader />
        <TaskForm 
        onTaskCreated={
        (newTask) =>
          setTasks(
            (prev) => [
              newTask,
              ...prev,
            ]
          )
  }/>
        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-6">
            Your Tasks
          </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500">
              No tasks created yet
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete = {handleDelete}
                />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}