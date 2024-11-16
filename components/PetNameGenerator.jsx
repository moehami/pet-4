import { useState } from "react";

export default function PetNameGenerator() {
  const [petType, setPetType] = useState("");
  const [gender, setGender] = useState("any");
  const [loading, setLoading] = useState(false);
  const [generatedNames, setGeneratedNames] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_AI21_API_KEY;

  const handleGenerateNames = async () => {
    if (!petType) return alert("Please enter a pet type!");
    setLoading(true);
    setGeneratedNames([]);

    try {
      const response = await fetch("https://api.ai21.com/studio/v1/j2-ultra/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Suggest some creative ${gender} names for a ${petType}:`,
          numResults: 1,
          maxTokens: 50,
          stopSequences: [".", "\n"],
        }),
      });

      const data = await response.json();
      console.log("start of ", data);
      const names = data.completions[0].data.text.split(",").map((name) => name.trim());
           console.log("start of names", names);
      setGeneratedNames(names);
    } catch (error) {
            console.log("error", error);
      console.error("Error generating names:", error);
      alert("Something went wrong while generating names!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-blue-50 shadow-lg rounded-lg border border-blue-200">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Pet Name Generator
      </h1>
                    <p className="text-gray-800 mt-2">
                Generate the perfect name for your furry friend using AI
              </p>

      <input
        type="text"
        placeholder="Enter pet type (e.g., dog, cat)"
        className="w-full p-3 mb-4 bg-white border border-blue-300 rounded text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={petType}
        onChange={(e) => setPetType(e.target.value)}
      />

      <div className="flex justify-center gap-4 mb-4">
        {["any", "male", "female"].map((g) => (
          <button
            key={g}
            className={`py-2 px-4 rounded ${
              gender === g
                ? "bg-blue-700 text-white"
                : "bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
            }`}
            onClick={() => setGender(g)}
          >
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </button>
        ))}
      </div>

      <button
        className="w-full py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800 transition disabled:opacity-50"
        onClick={handleGenerateNames}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </div>
        ) : (
          "Generate Names"
        )}
      </button>

      {generatedNames.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">
            Generated Names:
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {generatedNames.map((name, idx) => (
              <div
                key={idx}
                className="p-3 bg-blue-100 text-blue-700 border border-blue-300 rounded shadow text-center"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
