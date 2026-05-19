'use client';
import { useState } from "react";


export default function TaskForm({onTaskCreated}) {

    const [formData,setFormData] = useState({
        title:"",
        description:"",
        status:"pending",
    });
    const [loading,setLoading] = useState(false);


    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);

        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error("Token missing");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
                {
                    method:"POST",
                    headers:{
                        "Content-type":"application/json",
                        Authorization:`Bearer ${token}`,
                    },

                    body:JSON.stringify(formData),
                    
                }
            );
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message
                );
                }

            alert("Task Created Successfully");
            onTaskCreated(data.task);

            setFormData({
            title:"",
            description:"",
            status:"pending"
            });

        }catch(error){
            alert(error.message);
        }finally{
            setLoading(false);  
        }

    };


  return (

    
    
    <div className="bg-white rounded-xl shadow-md p-6">
        <form  onSubmit={handleSubmit}
               className="space-y-4">
            <h2 className="text-2xl font-semibold">
                Create Task
            </h2>

            <input
                type="text"
                name = "title"
                value = {formData.title}
                onChange={handleChange}
                placeholder="Task title"
                className="w-full border rounded-lg p-3"
            />

            <textarea
                name = "description"
                value = {formData.description}
                onChange={handleChange}
                placeholder="Task description"
                className="w-full border rounded-lg p-3 h-28 resize-none"
            />

            <select
                    className="w-full border rounded-lg p-3 bg-white"
                    name = "status"
                    value = {formData.status}
                    onChange={handleChange} >

                <option value="pending">
                pending
                </option>

                <option value="in-progress">
                in-progress
                </option>

                <option value="completed">
                completed
                </option>

            </select>

            <button type="submit" 
                    className="bg-black text-white rounded-lg py-3 px-4 w-full hover:shadow-lg transition-all"
                    disabled ={loading} >
                    {
                    loading
                    ? "Creating..."
                    : "Create Task"
                    }
            </button>
        </form>
      

    </div>
  );
}