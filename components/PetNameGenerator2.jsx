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

<div className="max-w-md mx-auto p-6 shadow-lg rounded-lg border border-orange-200">
     
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
        className="w-full p-3 mb-4 bg-white border border-orange-300 rounded text-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="w-full py-2 px-4 bg-orange-700 text-white rounded hover:bg-orange-800 transition disabled:opacity-50"
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
          <h2 className="text-lg font-semibold text-orange mb-4">
            Generated Names:
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {generatedNames.map((name, idx) => (
              <div
                key={idx}
                className="p-3 bg-orange-100 text-orange border border-orange-50 rounded shadow text-center"
              >
                {name}
              </div>
          
            ))}

          </div>
        </div>
      )}
                 <button data-tooltip-target="tooltip-website-url" data-copy-to-clipboard-target="{name}" class="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700 dark:border-blue-600 hover:border-blue-800 dark:hover:border-blue-700" type="button">
            <span id="default-icon">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                </svg>
            </span>
            <span id="success-icon" class="hidden inline-flex items-center">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </span>
        </button>
        <div id="tooltip-website-url" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            <span id="default-tooltip-message">Copy link</span>
            <span id="success-tooltip-message" class="hidden">Copied!</span>
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
    </div>
  );
}
