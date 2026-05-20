'use client'
import { useEffect, useState } from "react" 
import { useRouter } from "next/navigation";
   


export default function Register(){
    const router = useRouter();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            router.push("/dashboard");
        }
    } , [router]);

    
    const [formData , setFormData] = useState({
        name:"",
        email:"",
        password:"", 
    });
    const [loading ,setLoading] = useState(false);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
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

            localStorage.setItem("token" , data.token);

            
            router.push("/dashboard");
                

        }
        catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
            };




    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md border rounded-xl p-6 shadow-md">
                <h1 className="text-2xl font-bold mb-5 text-center">
                    Register
                </h1>

                <form 
                    onSubmit={handleSubmit}
                    className="space-y-4">

                    <input 
                    type = "text"
                    name="name"
                    value= {formData.name}
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                   />

                    <input 
                    type = "email"
                    name="email"
                    value= {formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
                <input 
                    type = "password"
                    name="password"
                    value= {formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
                <button 
                    type="submit"
                    className="w-full bg-black text-white rounded-lg p-3"> 
                    {  loading ? "Registering..." : "Register" }
                </button>
                </form>

            <p className=" text-center text-gray-600 mt-4 ">
            Already have an account?{" "}

            <span
                onClick={() =>
                router.push(
                    "/login"
                )
                }
                className=" text-blue-600 font-medium cursor-pointer hover:underline "
            >
                Login
            </span>
            </p>

            </div>

        </div>

    );
}