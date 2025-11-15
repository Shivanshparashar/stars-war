import { useState, useEffect } from 'react';
import { Character, Homeworld } from '../utils/types';
import { fetchCharacters, fetchHomeworld } from '../utils/api';

export const useCharacters = (page: number, search: string, filters: { homeworld?: string; film?: string; species?: string }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCharacters(page);
        let filtered = data.results;

        // Apply search
        if (search) {
          filtered = filtered.filter(char => char.name.toLowerCase().includes(search.toLowerCase()));
        }

        // Apply filters (basic client-side for simplicity; in production, use API params)
        if (filters.homeworld) {
          filtered = filtered.filter(char => char.homeworld === filters.homeworld);
        }
        if (filters.film) {
          filtered = filtered.filter(char => char.films.includes(filters.film!));
        }
        if (filters.species) {
          filtered = filtered.filter(char => char.species.includes(filters.species!));
        }

        setCharacters(filtered);
        setNext(data.next);
        setPrevious(data.previous);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, [page, search, filters]);

  const fetchCharacterHomeworld = async (url: string): Promise<Homeworld> => {
    return await fetchHomeworld(url);
  };

  return { characters, loading, error, next, previous, fetchCharacterHomeworld };
};