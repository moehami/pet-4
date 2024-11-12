// components/PetName.tsx
import { useState } from 'react';
import Head from 'next/head';

export default function PetName() {
  const [petType, setPetType] = useState('');
  const [gender, setGender] = useState('');
  const [generatedName, setGeneratedName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateName = async () => {
    if (!petType || !gender) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ petType, gender }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate name');
      }

      const data = await response.json();
      setGeneratedName(data.name);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate name. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Pet Name Generator</title>
        <meta name="description" content="Generate creative pet names using AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Pet Name Generator
              </h1>
              <p className="text-gray-600 mt-2">
                Generate the perfect name for your furry friend using AI
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="petType" className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Type
                </label>
                <input
                  id="petType"
                  type="text"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  placeholder="Enter pet type (e.g., dog, cat)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setGender('male')}
                    className={`flex-1 py-2 px-4 rounded-md transition ${
                      gender === 'male'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`flex-1 py-2 px-4 rounded-md transition ${
                      gender === 'female'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <button
                onClick={handleGenerateName}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    <span>Generating...</span>
                  </>
                ) : (
                  'Generate Name'
                )}
              </button>

              {generatedName && (
                <div className="mt-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Here's a perfect name:
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    {generatedName}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
