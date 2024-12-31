import { useState } from 'react';
import petNames from '../data/petNames';
import Clipboard3Component from "./Clipboard3Component";
const PetNameGenerator = ({ 
  onNameGenerated,
  customMaleNames,
  customFemaleNames,
  className,
}) => {
  const [petType, setPetType] = useState('');
  const [gender, setGender] = useState('');
  const [generatedNames, setGeneratedNames] = useState([]);

  const maleNames = customMaleNames || petNames.male;
  const femaleNames = customFemaleNames || petNames.female;

  const generateNames = () => {
    if (!petType) {
      alert('Please enter a pet type');
      return;
    }

    let namesList;
    if (gender === 'male') {
      namesList = maleNames;
    } else if (gender === 'female') {
      namesList = femaleNames;
    } else {
      namesList = [...maleNames, ...femaleNames];
    }

    // Generate 4 unique random names
    const selectedNames = [];
    const tempNamesList = [...namesList];
    
    for (let i = 0; i < 4; i++) {
      if (tempNamesList.length === 0) break;
      const randomIndex = Math.floor(Math.random() * tempNamesList.length);
      selectedNames.push(tempNamesList.splice(randomIndex, 1)[0]);
    }

    setGeneratedNames(selectedNames);
    
    if (onNameGenerated) {
      onNameGenerated({ names: selectedNames, gender, petType });
    }
  };
  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 ${className}`}>
      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: '#ed5c01' }}>
        Pet Name Generator
      </h1>

      <div className="space-y-6">
        <div>
          <label htmlFor="petType" className="block text-xl font-medium text-gray-700 mb-2">
            What kind of pet do you have?
          </label>
          <input
            type="text"
            id="petType"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
            style={{ focusRing: '#ed5c01' }}
            placeholder="e.g., Dog, Cat, Bird..."
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          {['male', 'female', 'any'].map((type) => (
            <button
              key={type}
              onClick={() => setGender(type)}
              className="flex-1 py-2 px-4 rounded-lg transition-all duration-300 transform"
              style={{
                backgroundColor: gender === type ? '#ed5c01' : '#062d3e',
                color: 'white',
                transform: gender === type ? 'translateY(-2px)' : 'none',
                boxShadow: gender === type ? '0 4px 12px rgba(237, 92, 1, 0.25)' : 'none'
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={generateNames}
          className="w-full py-3 px-4 text-white rounded-lg font-medium transition-all duration-300"
          style={{
            backgroundColor: '#e45a03',
            transform: 'translateY(0)',
            boxShadow: '0 4px 12px rgba(237, 92, 1, 0.15)',
          }}
        >
          Generate Names
        </button>

        {generatedNames.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-x1 font-medium" style={{ color: '#062d3e' }}>
              Perfect names for your {petType}:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {generatedNames.map((name, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: '#062d3e',
                    color: 'white',
                    transform: 'translateY(0)',
                    boxShadow: '0 2px 8px rgba(6, 45, 62, 0.15)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="cursor-pointer text-xl font-bold "> <Clipboard3Component textToCopy={name} /></span>
                  
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetNameGenerator;