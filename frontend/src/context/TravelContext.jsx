import React, { createContext, useState, useContext, useEffect } from "react";

const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState(null);

  const [isPlanning, setIsPlanning] = useState(false);
  const [tripPlanData, setTripPlanData] = useState(null);

  // 🔹 Load state from localStorage on first mount
  useEffect(() => {
    const savedTracking = localStorage.getItem("trackingData");
    const savedTripPlan = localStorage.getItem("tripPlanData");

    if (savedTracking) {
      const parsed = JSON.parse(savedTracking);
      setIsTracking(parsed.isTracking);
      setTrackingData(parsed.trackingData);
    }

    if (savedTripPlan) {
      const parsed = JSON.parse(savedTripPlan);
      setIsPlanning(parsed.isPlanning);
      setTripPlanData(parsed.tripPlanData);
    }
  }, []);

  // 🔹 Save Tracking state whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "trackingData",
      JSON.stringify({ isTracking, trackingData })
    );
  }, [isTracking, trackingData]);

  // 🔹 Save Trip Plan state whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "tripPlanData",
      JSON.stringify({ isPlanning, tripPlanData })
    );
  }, [isPlanning, tripPlanData]);

  // Functions
  const startTracking = (data) => {
    setIsTracking(true);
    setTrackingData(data);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setTrackingData(null);
    localStorage.removeItem("trackingData");
  };

  const startPlanning = (data) => {
    setIsPlanning(true);
    setTripPlanData(data);
  };

  const cancelPlanning = () => {
    setIsPlanning(false);
    setTripPlanData(null);
    localStorage.removeItem("tripPlanData");
  };

  return (
    <TravelContext.Provider
      value={{
        isTracking,
        trackingData,
        startTracking,
        stopTracking,
        isPlanning,
        tripPlanData,
        startPlanning,
        cancelPlanning,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => useContext(TravelContext);
