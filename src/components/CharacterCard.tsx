import React from 'react';
import { Character } from '../utils/types';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const speciesColors: { [key: string]: string } = {
  'Human': 'border-blue-400',
  'Droid': 'border-gray-400',
  'Wookiee': 'border-green-400',
  // Add more as needed
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  // Extract species name from URL or array
  const speciesName =
    character.species.length > 0
      ? character.species[0].split('/').pop() ?? ''
      : '';

  // Assign border color based on species; fallback to gray
  const borderColor = speciesColors[speciesName] || 'border-gray-300';

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-xl border-2 ${borderColor} bg-white shadow-lg transition transform hover:scale-105 hover:shadow-2xl`}
    >
      <img
        src={`https://picsum.photos/400/300?random=${character.name}`}
        alt={character.name}
        className="w-full h-64 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{character.name}</h3>
        {/* Only show species if it exists */}
        {speciesName && <p className="text-sm text-gray-700 mt-1">{speciesName}</p>}
      </div>
    </div>
  );
};

export default CharacterCard;


