import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterModal from './CharacterModal';
import { Character, Homeworld } from '../utils/types';

// Mock the fetchHomeworld function
const mockFetchHomeworld = jest.fn();

const mockCharacter: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
  homeworld: 'https://swapi.dev/api/planets/1/',
  species: ['https://swapi.dev/api/species/1/'],
  created: '2014-12-09T13:50:51.644000Z',
  url: 'https://swapi.dev/api/people/1/',
};

const mockHomeworld: Homeworld = {
  name: 'Tatooine',
  terrain: 'desert',
  climate: 'arid',
  population: '200000',
};

describe('CharacterModal', () => {
  beforeEach(() => {
    mockFetchHomeworld.mockClear();
  });

  test('renders nothing when character is null', () => {
    render(<CharacterModal character={null} onClose={() => {}} fetchHomeworld={mockFetchHomeworld} />);
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });

  test('renders character details correctly', async () => {
    mockFetchHomeworld.mockResolvedValue(mockHomeworld);

    await act(async () => {
      render(<CharacterModal character={mockCharacter} onClose={() => {}} fetchHomeworld={mockFetchHomeworld} />);
    });

    // Check if character name is displayed
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    // Check other details using regex to match partial text
    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByText(/172/)).toBeInTheDocument();
    expect(screen.getByText(/Mass:/)).toBeInTheDocument();
    expect(screen.getByText(/77/)).toBeInTheDocument();
    expect(screen.getByText(/Films:/)).toBeInTheDocument();
    expect(screen.getByText(/^2$/)).toBeInTheDocument();
    expect(screen.getByText(/Birth Year:/)).toBeInTheDocument();
    expect(screen.getByText(/19BBY/)).toBeInTheDocument();

    // Wait for homeworld to load
    await waitFor(() => {
      expect(screen.getByText(/Homeworld:/)).toBeInTheDocument();
      expect(screen.getByText(/Tatooine/)).toBeInTheDocument();
      expect(screen.getByText(/Terrain:/)).toBeInTheDocument();
      expect(screen.getByText(/desert/)).toBeInTheDocument();
      expect(screen.getByText(/Climate:/)).toBeInTheDocument();
      expect(screen.getByText(/arid/)).toBeInTheDocument();
      expect(screen.getByText(/Population:/)).toBeInTheDocument();
      expect(screen.getByText(/200000/)).toBeInTheDocument();
    });

   
    expect(mockFetchHomeworld).toHaveBeenCalledWith('https://swapi.dev/api/planets/1/');
  });

  test('shows loading state while fetching homeworld', async () => {
    mockFetchHomeworld.mockImplementation(() => new Promise(() => {})); // Never resolves

    await act(async () => {
      render(<CharacterModal character={mockCharacter} onClose={() => {}} fetchHomeworld={mockFetchHomeworld} />);
    });

    expect(screen.getByText('Loading homeworld...')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', async () => {
    const mockOnClose = jest.fn();

    mockFetchHomeworld.mockResolvedValue(mockHomeworld);

    await act(async () => {
      render(<CharacterModal character={mockCharacter} onClose={mockOnClose} fetchHomeworld={mockFetchHomeworld} />);
    });

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('formats date correctly', async () => {
    mockFetchHomeworld.mockResolvedValue(mockHomeworld);

    await act(async () => {
      render(<CharacterModal character={mockCharacter} onClose={() => {}} fetchHomeworld={mockFetchHomeworld} />);
    });

    
    expect(screen.getByText(/Date Added:/)).toBeInTheDocument();
    expect(screen.getByText(/09\/12\/2014/)).toBeInTheDocument();
  });
});
