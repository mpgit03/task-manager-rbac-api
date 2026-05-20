'use client'
import { useState , useEffect } from "react" 
import { useRouter } from "next/navigation";
   


export default function Login(){
    const router = useRouter();

    useEffect(()=>{
        const token =localStorage.getItem("token");
        if(token){
            router.push("/dashboard");
        }
    },[router]);


    //states
    const [formData , setFormData] = useState({
        email:"",
        password:"", 
    });
    const [loading ,setLoading] = useState(false);
    const [error,setError] = useState("");
    

    
    // event functions
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        

        try{
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    method:"POST",
                    headers:{
                        "Content-type":"application/json",
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

            // alert(
            //     "Login Successful"
            // );
            
            router.push("/dashboard");
                

        }
        catch (error) {
            setError(
                error.message
            );
        } finally {
            setLoading(false);
        }
            };




    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md border rounded-xl p-6 shadow-md">
                <h1 className="text-2xl font-bold mb-5 text-center">
                    Login
                </h1>

                <form 
                    onSubmit={handleSubmit}
                    className="space-y-4">

                        {error && (
                            <p className=
                            "text-red-500 text-sm text-center">
                                {error}
                            </p>
                        )}

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
                    disabled={loading}
                    className="w-full bg-black text-white rounded-lg p-3"> 
                    {  loading ? "Logging in ..." : "Login" }
                </button>
                </form>
                <p className=" text-center text-gray-600 mt-4 ">
                Don't have an account?{" "}
                <span onClick={() =>
                    router.push( "/register" )
                    }
                    className=" text-blue-600 font-medium cursor-pointer  hover:underline "
                >
                    Register
                </span>
                </p>

            </div>

        </div>

    );
}