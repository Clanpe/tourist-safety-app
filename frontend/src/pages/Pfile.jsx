import React, { useState } from "react";
import DigitalId from "../components/User_id_profile";
import TripPlan from "../components/trip_plan_profile";

function Pfile() {
  const [activeTab, setActiveTab] = useState("digitalId");

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
