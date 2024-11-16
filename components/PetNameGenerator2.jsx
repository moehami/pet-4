import { useState } from "react";

export default function PetNameGenerator() {
  const [petType, setPetType] = useState("");
  const [gender, setGender] = useState("any");
  const [loading, setLoading] = useState(false);
  const [generatedNames, setGeneratedNames] = useState([]);

  // Primary and backup API keys (store them securely in .env.local)
  const API_KEY_PRIMARY = process.env.NEXT_PUBLIC_AI21_API_KEY;
  const API_KEY_BACKUP = process.env.NEXT_PUBLIC_BACKUP_API_KEY;

  // API endpoints
  const API_ENDPOINT_PRIMARY = "https://api.ai21.com/studio/v1/j2-ultra/complete";
  const API_ENDPOINT_BACKUP = "https://api.backup-provider.com/v1/generate-names";

  const fetchNames = async (endpoint, apiKey) => {
    return await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: `Suggest some creative ${gender} names for a ${petType}:`,
        numResults: 1,
        maxTokens: 50,
      }),
    });
  };

  const handleGenerateNames = async () => {
    if (!petType) return alert("Please enter a pet type!");
    setLoading(true);
    setGeneratedNames([]);

    try {
      // Try primary API
      const primaryResponse = await fetchNames(API_ENDPOINT_PRIMARY, API_KEY_PRIMARY);
      if (!primaryResponse.ok) throw new Error("Primary API failed");

      const primaryData = await primaryResponse.json();
      const primaryNames = primaryData.completions[0].data.text.split(",").map((name) => name.trim());
      setGeneratedNames(primaryNames);
    } catch (primaryError) {
      console.warn("Primary API failed, trying backup...", primaryError);

      try {
        // Fallback to backup API
        const backupResponse = await fetchNames(API_ENDPOINT_BACKUP, API_KEY_BACKUP);
        if (!backupResponse.ok) throw new Error("Backup API failed");

        const backupData = await backupResponse.json();
        const backupNames = backupData.names; // Adjust according to the backup API response format
        setGeneratedNames(backupNames);
      } catch (backupError) {
        console.error("Both APIs failed", backupError);
        alert("Something went wrong while generating names!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-blue-50 shadow-lg rounded-lg border border-blue-200">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Pet Name Generator
      </h1>

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
