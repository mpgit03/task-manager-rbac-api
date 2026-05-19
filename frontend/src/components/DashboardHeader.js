"use client";

import { useRouter }
from "next/navigation";

export default function DashboardHeader() {


  const router =
    useRouter();

  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      router.push(
        "/login"
      );
    };

  return (
    <div className="flex justify-between items-center border-b pb-4 mb-8">

      
      <div>
        <h1 className="text-3xl font-bold">
          Task Dashboard
        </h1>

        <p className="text-gray-600 mt-1">
          Create, update and track your tasks
        </p>
      </div>

      
      <button
        onClick={
          handleLogout
        }
        className="bg-black text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
      >
        Logout
      </button>

    </div>
  );
}