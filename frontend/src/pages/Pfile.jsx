import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DigitalId from "../components/User_id_profile";
import TripPlan from "../components/trip_plan_profile";

function Pfile() {
  const [activeTab, setActiveTab] = useState("digitalId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    console.log("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-6 border-b border-blue-700">Profile</h2>
        <ul className="flex flex-col p-4 space-y-2">
          <li
            className={`p-3 rounded-lg cursor-pointer transition ${
              activeTab === "digitalId" ? "bg-blue-600 font-semibold" : "hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("digitalId")}
          >
            Digital ID
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer transition ${
              activeTab === "tripPlan" ? "bg-blue-600 font-semibold" : "hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("tripPlan")}
          >
            Trip Plan
          </li>
          <li
            className="p-3 rounded-lg cursor-pointer transition hover:bg-red-600 mt-8 border-t border-blue-700 pt-4"
            onClick={handleLogout}
          >
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === "digitalId" && <DigitalId />}
        {activeTab === "tripPlan" && <TripPlan />}
      </div>
    </div>
  );
}

export default Pfile;
