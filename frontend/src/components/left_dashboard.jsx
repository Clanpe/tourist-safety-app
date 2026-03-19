// src/components/LeftPanel.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MapComponent from "./MapComponent";
import PanicButton from "./PanicButton";

function LeftPanel({ setStartLocation, setCurrentLocation, currentLocation }) {
  // Load persisted showMap from localStorage
  const [showMap, setShowMap] = useState(() => {
    return JSON.parse(localStorage.getItem("showMap")) || false;
  });

  // Save whenever showMap changes
  useEffect(() => {
    localStorage.setItem("showMap", JSON.stringify(showMap));
  }, [showMap]);

  console.log(currentLocation)
  return (
    <motion.div
      className="flex-1 max-w-3xl mx-auto bg-blue-50 rounded-2xl shadow-xl p-6 border border-blue-200"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
    >
      <h2 className="text-blue-700 font-bold mb-3 text-lg flex items-center">
        🗺️ Your Location
      </h2>

      {/* Map Section */}
      <div className="w-full h-110 rounded-xl overflow-hidden shadow-inner border border-blue-300">
        {showMap ? (
          <MapComponent
            setStartLocation={setStartLocation}
            setCurrentLocation={setCurrentLocation}
          />
        ) : (
          <img
            src="/map.png"
            alt="Map"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Start Live Tracking Button */}
      {!showMap && (
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowMap(true)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Start Live Tracking
          </button>
        </motion.div>
      )}

      {/* Panic Button */}
      {/* Panic Button */}
      <motion.div
        className="flex justify-center mt-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <PanicButton currentLocation={currentLocation} />
      </motion.div>


      {/* Location Details */}
      {currentLocation && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow border text-sm">
          <h3 className="font-bold text-blue-700 mb-2">📍 Current Location</h3>
          <p><strong>Address:</strong> {currentLocation.displayName}</p>
          <p><strong>City:</strong> {currentLocation.city}</p>
          <p><strong>District:</strong> {currentLocation.district}</p>
          <p><strong>State:</strong> {currentLocation.state}</p>
          <p><strong>Postal Code:</strong> {currentLocation.postcode}</p>
          <p><strong>Place Id:</strong> {currentLocation.placeId}</p>
          <p><strong>Type:</strong> {currentLocation.type}</p>


        </div>
      )}
    </motion.div>
  );
}

export default LeftPanel;
