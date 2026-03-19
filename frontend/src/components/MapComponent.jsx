import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "12px",
  position: "relative",
};

const MapComponent = ({ setStartLocation, setCurrentLocation }) => {
  const [map, setMap] = useState(null);
  const [startCoords, setStartCoords] = useState(null);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [path, setPath] = useState([]);

  const parseLocationDetails = (data, lat, lon) => {
    const components = data.results?.[0]?.address_components || [];
    const getComp = (type) =>
      components.find((c) => c.types.includes(type))?.long_name || "N/A";

    return {
      displayName: data.results?.[0]?.formatted_address || "Unknown",
      placeId: data.results?.[0]?.place_id || "N/A",
      latitude: lat,
      longitude: lon,
      class: "place",
      type: data.results?.[0]?.types?.[0] || "N/A",
      state: getComp("administrative_area_level_1"),
      district:
        getComp("administrative_area_level_2") ||
        getComp("administrative_area_level_3") ||
        "N/A",
      city:
        getComp("locality") ||
        getComp("sublocality") ||
        getComp("administrative_area_level_3") ||
        "N/A",
      postcode: getComp("postal_code") || "N/A",
    };
  };

  const fetchLocationDetails = async (lat, lon, isStart = false) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`
      );
      const data = await res.json();
      const details = parseLocationDetails(data, lat, lon);

      if (isStart) setStartLocation(details);
      else setCurrentLocation(details);
    } catch (err) {
      console.error("Error fetching location details:", err);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (!startCoords) {
          setStartCoords({ lat: latitude, lng: longitude });
          fetchLocationDetails(latitude, longitude, true);
        }

        setCurrentCoords({ lat: latitude, lng: longitude });
        setPath([
          startCoords || { lat: latitude, lng: longitude },
          { lat: latitude, lng: longitude },
        ]);

        fetchLocationDetails(latitude, longitude, false);

        if (map) {
          map.panTo({ lat: latitude, lng: longitude });
        }
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map, startCoords]);

  const handleRecenter = () => {
    if (currentCoords && map) {
      map.panTo(currentCoords);
      map.setZoom(16);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCoords || { lat: 28.6139, lng: 77.209 }}
        zoom={16}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {startCoords && (
          <Marker
            position={startCoords}
            icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          />
        )}
        {currentCoords && (
          <Marker
            position={currentCoords}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
        )}
        {path.length >= 2 && (
          <Polyline
            path={path}
            options={{ strokeColor: "blue", strokeWeight: 4, opacity: 0.7 }}
          />
        )}
      </GoogleMap>

      {/* Bottom-left Re-center Button */}
      <button
        onClick={handleRecenter}
        style={{
          position: "absolute",
          bottom: "66px",
          left: "20px",
          zIndex: 9999,
          padding: "10px 16px",
          border: "none",
          borderRadius: "20px",
          background: "#007bff",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        Re-center
      </button>
    </div>
  );
};

export default MapComponent;

