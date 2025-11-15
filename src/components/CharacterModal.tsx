import React, { useState, useEffect } from 'react';
import { Character, Homeworld } from '../utils/types';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
  fetchHomeworld: (url: string) => Promise<Homeworld>;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose, fetchHomeworld }) => {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (character) {
      setLoading(true);
      fetchHomeworld(character.homeworld).then(setHomeworld).finally(() => setLoading(false));
    }
  }, [character, fetchHomeworld]);

  if (!character) return null;

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-GB'); // dd-MM-yyyy

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
        <p><strong>Height:</strong> {character.height} m</p>
        <p><strong>Mass:</strong> {character.mass} kg</p>
        <p><strong>Date Added:</strong> {formatDate(character.created)}</p>
        <p><strong>Films:</strong> {character.films.length}</p>
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        {loading ? <p>Loading homeworld...</p> : homeworld && (
          <>
            <p><strong>Homeworld:</strong> {homeworld.name}</p>
            <p><strong>Terrain:</strong> {homeworld.terrain}</p>
            <p><strong>Climate:</strong> {homeworld.climate}</p>
            <p><strong>Population:</strong> {homeworld.population}</p>
          </>
        )}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default CharacterModal; 