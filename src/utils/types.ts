export interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  films: string[];
  homeworld: string;
  species: string[];
  created: string;
  url: string;
}

export interface Homeworld {
  name: string;
  terrain: string;
  climate: string;
  population: string;
}

export interface Species {
  name: string;
  url: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}