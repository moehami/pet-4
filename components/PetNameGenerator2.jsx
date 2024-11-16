import { useState } from "react";

export default function PetNameGenerator() {
  const [petType, setPetType] = useState("");
  const [gender, setGender] = useState("any");
  const [loading, setLoading] = useState(false);
  const [generatedNames, setGeneratedNames] = useState([]);
  const [copiedName, setCopiedName] = useState(null);

  // Primary and backup API keys (store them securely in .env.local)
  const API_KEY_PRIMARY = process.env.NEXT_PUBLIC_AI21_API_KEY;
  const API_KEY_BACKUP = process.env.NEXT_PUBLIC_BACKUP_API_KEY;

  // API endpoints
  const API_ENDPOINT_PRIMARY = "https://api.ai21.com/studio/v1/j2-ultra/complete";
  const API_ENDPOINT_BACKUP = "https://api.anthropic.com/v1/messages";

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

      // Clean and split names
      const rawNames = primaryData.completions[0].data.text;
      const primaryNames = rawNames
        .split(/[\n,]+/) // Split by newlines or commas
        .map((name) => name.trim()) // Trim whitespace
        .filter((name) => name); // Remove empty strings

      setGeneratedNames(primaryNames);
    } catch (primaryError) {
      console.warn("Primary API failed, trying backup...", primaryError);

      try {
        // Fallback to backup API
        const backupResponse = await fetchNames(API_ENDPOINT_BACKUP, API_KEY_BACKUP);
        if (!backupResponse.ok) throw new Error("Backup API failed");

        const backupData = await backupResponse.json();

        // Adjust according to the backup API's response format
        const backupNames = backupData.names
          .map((name) => name.trim()) // Trim whitespace
          .filter((name) => name); // Remove empty strings

        setGeneratedNames(backupNames);
      } catch (backupError) {
        console.error("Both APIs failed", backupError);
        alert("Something went wrong while generating names!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (name) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000); // Clear feedback after 2 seconds
  };

  return (
    <div className="md:w-auto mx-auto p-6 shadow-lg rounded-lg border border-orange-200">
      <h1 className="text-2xl font-bold text-center text-orange mb-6">
        Pet Name Generator
      </h1>
      <p className="text-orange-800 mt-2">
        Generate the perfect name for your furry friend using AI
      </p>
      <br />
      <input
        type="text"
        placeholder="Enter pet type (e.g., dog, cat)"
        className="w-full p-3 mb-4 bg-white border border-orange-300 rounded text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={petType}
        onChange={(e) => setPetType(e.target.value)}
      />

      <div className="flex justify-center gap-4 mb-4">
        {["any", "male", "female"].map((g) => (
          <button
            key={g}
            className={`py-2 px-4 rounded ${
              gender === g
                ? "bg-orange-700 text-white"
                : "bg-orange-100 text-orange-700 border border-orange-300 hover:bg-orange-200"
            }`}
            onClick={() => setGender(g)}
          >
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </button>
        ))}
      </div>

      <button
        className="btn btn-orange mx-auto lg:mx-0"
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
          <h2 className="text-lg font-semibold text-orange-700 mb-4">
            Generated Names:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {generatedNames.map((name, idx) => (
              <div
                key={idx}
                className="p-3 bg-orange-100 text-orange-700 border border-orange-300 rounded shadow text-center flex flex-col items-center"
              >
                <span>{name}</span>
                <button
                  className="mt-2 py-1 px-3 bg-orange-700 text-white text-sm rounded hover:bg-orange-800"
                  onClick={() => handleCopy(name)}
                >
                  {copiedName === name ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
