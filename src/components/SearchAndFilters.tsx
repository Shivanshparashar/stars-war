import React, { useState, useEffect } from 'react';
import { fetchSpecies, fetchFilms, fetchHomeworlds } from '../utils/api';

interface SearchAndFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: { homeworld?: string; film?: string; species?: string }) => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({ onSearch, onFilter }) => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ homeworld?: string; film?: string; species?: string }>({});
  const [species, setSpecies] = useState<{ name: string; url: string }[] | null>(null);
  const [films, setFilms] = useState<{ title: string; url: string }[] | null>(null);
  const [homeworlds, setHomeworlds] = useState<{ name: string; url: string }[] | null>(null);

  useEffect(() => {
    fetchSpecies().then(setSpecies).catch(() => setSpecies([]));
    fetchFilms().then(setFilms).catch(() => setFilms([]));
    fetchHomeworlds().then(setHomeworlds).catch(() => setHomeworlds([]));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const renderSelect = (
    items: { name?: string; title?: string; url: string }[] | null,
    type: 'species' | 'films' | 'homeworld',
    selectedValue: string | undefined,
    placeholder: string
  ) => {
    return (
      <select
        value={selectedValue || ''}
        onChange={(e) => handleFilterChange(type, e.target.value)}
        className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-56 cursor-pointer text-black bg-white"
      >
        {items === null ? (
          <option value="">Loading...</option>
        ) : items.length === 0 ? (
          <option value="">No results found</option>
        ) : (
          <>
            <option value="">{placeholder}</option>
            {items.map((item, idx) => {
              const label = type === 'films' ? item.title : item.name;
              return (
                <option key={idx} value={item.url}>
                  {label || 'Unknown'}
                </option>
              );
            })}
          </>
        )}
      </select>
    );
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4 justify-start">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleSearch}
        className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-64 text-black bg-white"
      />

      {renderSelect(species, 'species', filters.species, 'Filter by Species')}
      {renderSelect(films, 'films', filters.film, 'Filter by Film')}
      {renderSelect(homeworlds, 'homeworld', filters.homeworld, 'Filter by Homeworld')}
    </div>
  );
};

export default SearchAndFilters;
