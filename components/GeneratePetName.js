// components/GeneratePetName.js

import { useState } from "react";

export default function GeneratePetName() {
  const [petName, setPetName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sex, setSex] = useState("male");

  const handleGeneratePetName = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generatePetName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sex }),
      });
      const data = await response.json();
      console.log("Generated Pet Name:", data.petName);
      setPetName(data.petName);
    } catch (error) {
      console.error("Error generating pet name:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col items-center">
        <label className="mt-4">
          <span className="text-lg font-semibold">Choose the sex of the pet:</span>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded mt-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <button
          type="button"
          onClick={handleGeneratePetName}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Pet Name"}
        </button>
      </form>
      {petName && (
        <p className="mt-4 text-lg font-semibold">
          Your new pet name: {petName}
        </p>
      )}
    </div>
  );
}
