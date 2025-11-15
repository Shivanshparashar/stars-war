import React, { useState } from 'react';
import { useCharacters } from './hooks/useCharacters';
import { useAuth } from './hooks/useAuth';
import { Character } from './utils/types';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import SearchAndFilters from './components/SearchAndFilters';
import LoginForm from './components/LoginForm';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const { auth, login, logout } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ homeworld?: string; film?: string; species?: string }>({});
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const { characters, loading, error, next, previous, fetchCharacterHomeworld } = useCharacters(page, search, filters);

  if (!auth.isLoggedIn) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white p-6"
      style={{
        backgroundImage: "url('/download.jpg')",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 animate-gradient-x">
          Star Wars Characters
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-500 transition text-white px-5 py-2 rounded-lg shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      {/* Search & Filters */}
      <SearchAndFilters onSearch={setSearch} onFilter={setFilters} />

      {/* Status */}
      {loading && <p className="text-yellow-400 text-center mt-4 animate-pulse">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Characters Grid */}
      {characters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {characters.map((character) => (
            <CharacterCard
              key={character.url}
              character={character}
              onClick={() => setSelectedCharacter(character)}
            />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-white-400 mt-8 text-lg animate-pulse">No Result Found</p>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        hasNext={!!next}
        hasPrevious={!!previous}
        onNext={() => setPage(page + 1)}
        onPrevious={() => setPage(page - 1)}
      />

      {/* Character Modal */}
      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        fetchHomeworld={fetchCharacterHomeworld}
      />
    </div>
  );
};

export default App;
