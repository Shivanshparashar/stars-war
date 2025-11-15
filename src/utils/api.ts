import { Character, Homeworld, Species } from './types';

const BASE_URL = 'https://swapi.dev/api';

export const fetchCharacters = async (page: number = 1): Promise<{ results: Character[]; next: string | null; previous: string | null }> => {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!response.ok) throw new Error('Failed to fetch characters');
  return response.json();
};

export const fetchHomeworld = async (url: string): Promise<Homeworld> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch homeworld');
  return response.json();
};

export const fetchSpecies = async (): Promise<Species[]> => {
  const response = await fetch(`${BASE_URL}/species/`);
  if (!response.ok) throw new Error('Failed to fetch species');
  return response.json().then(data => data.results);
};

export const fetchFilms = async (): Promise<{ title: string; url: string }[]> => {
  const response = await fetch(`${BASE_URL}/films/`);
  if (!response.ok) throw new Error('Failed to fetch films');
  return response.json().then(data => data.results);
};

export const fetchHomeworlds = async (): Promise<{ name: string; url: string }[]> => {
  const response = await fetch(`${BASE_URL}/planets/`);
  if (!response.ok) throw new Error('Failed to fetch homeworlds');
  return response.json().then(data => data.results);
};