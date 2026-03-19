// src/components/PanicButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PanicButton({ currentLocation }) {
  const navigate = useNavigate();

  const transformLocation = (loc) => {
    if (!loc) return null;
    return {
      coordinates: {
        type: "Point",
        coordinates: [loc.longitude, loc.latitude], // [lon, lat]
      },
      state: loc.state || "",
      city: loc.city || "",
      district: loc.district || "",
      place_id: loc.placeId || "",
      type: loc.type || "current",
      detailed_address: loc.displayName || "",
      postcode: loc.postcode || "",
    };
  };

  const handlePanic = async () => {
    console.log("🔴 Panic button clicked!");

    const digitalIdData = localStorage.getItem("digitalIdData");
    if (!digitalIdData) {
      alert("⚠️ create your Digital ID to access Panic Button");
      console.warn("⚠️ No digitalIdData found, redirecting...");
      navigate("/Profile");
      return;
    }

    const parsedIdData = JSON.parse(digitalIdData);
    console.log("👤 Digital ID data:", parsedIdData);

    const transformedLocation = transformLocation(currentLocation);
    console.log("📍 Transformed location:", transformedLocation);

    const transformedContacts = (parsedIdData.emergencyContacts || []).map(
      (c) => ({
        name: c.name,
        phone: c.contact,
        relation: c.relation,
      })
    );

    const panicPayload = {
      email : localStorage.getItem("email") || "",
      name: parsedIdData.name,
      contact_number: parsedIdData.contactInfo,
      kyc: {
        aadhaar: { number: parsedIdData.aadhaarNumber || null },
        passport: {
          number: parsedIdData.passportNumber || null,
          country: parsedIdData.passportCountry || null,
        },
      },
      emergency_contacts: transformedContacts,
      locations: transformedLocation ? [transformedLocation] : [],
    };

    console.log("📦 Final panicPayload:", panicPayload);
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:5000/api/panic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,   // 🔑 attach token here
        },
        body: JSON.stringify(panicPayload),
      });

      if (response.ok) {
        console.log("🚨 Panic data sent successfully!");
        alert("🚨 Panic alert sent successfully!");
      } else {
        const errData = await response.json().catch(() => null);
        console.error("❌ Failed to send panic data:", errData || response.status);
      }
    } catch (err) {
      console.error("⚠️ Error sending panic data:", err);
    }
  };

  return (
    <motion.button
      onClick={handlePanic}
      className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg"
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 20px 5px rgba(255,0,0,0.8)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      PANIC
    </motion.button>
  );
}

export default PanicButton;
