# Star Wars Characters App

A React-based web application for browsing Star Wars characters using the SWAPI (Star Wars API). Features include user authentication, search, filtering, pagination, and detailed character views.

## How to Run the Project

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Clone the repository or download the project files.
2. Navigate to the project directory: `cd star-wars-app`
3. Install dependencies: `npm install`

### Running the App
- Ensure dependencies are installed: `npm install`
- Start the development server: `npm start`
- Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
- Build the app: `npm run build`
- The build artifacts will be stored in the `build/` directory.

### Testing
- Run tests: `npm test`
- Run specific test file: `npm test -- --testPathPattern=CharacterModal.test.tsx --watchAll=false`
- The `CharacterModal.test.tsx` file contains integration tests for the CharacterModal component, verifying it renders character details correctly, handles loading states, and responds to user interactions like closing the modal. It uses React Testing Library to simulate user behavior and ensure the component functions as expected in a browser-like environment.

## What I Implemented

### Core Features
- **Authentication**: Mock login system (username: `admin`, password: `password`). Stores token in localStorage with auto-refresh every 5 minutes.
- **Character Listing**: Fetches and displays Star Wars characters from SWAPI with pagination.
- **Search**: Real-time search by character name.
- **Filters**: Filter by homeworld, film, and species (client-side filtering due to SWAPI limitations).
- **Pagination**: Navigate through pages of characters.
- **Character Details**: Click on a character card to view detailed information in a modal, including homeworld details fetched on demand.
- **Responsive Design**: Uses Tailwind CSS for styling, with a Star Wars-themed background image and animations.

### Components
- `LoginForm`: Handles user login.
- `CharacterCard`: Displays character summary.
- `CharacterModal`: Shows detailed character info.
- `SearchAndFilters`: Search input and filter dropdowns.
- `Pagination`: Page navigation controls.

### Hooks
- `useAuth`: Manages authentication state.
- `useCharacters`: Handles character fetching, filtering, and pagination.

### Bonus Features
- Gradient animated title.
- Hover effects and transitions on buttons/cards.
- Logout functionality.
- Loading states and error handling.
- No results message when search/filters yield nothing.

## Trade-offs and Design Choices

### Trade-offs
- **Client-side Filtering**: Filters (homeworld, film, species) are applied client-side after fetching data, as SWAPI does not support advanced query parameters. This may not scale well for large datasets but is sufficient for this demo.
- **Mock Authentication**: Uses a simple mock auth system instead of a real backend for simplicity. In production, integrate with a proper auth service.
- **No Caching**: Data is fetched on every page change/search. Could add caching for better performance.
- **Limited Error Handling**: Basic error messages; could be expanded with more user-friendly notifications.

### Design Choices
- **React Hooks**: Used custom hooks for state management to keep components clean and reusable.
- **TypeScript**: Ensures type safety and better development experience.
- **Tailwind CSS**: For rapid UI development and consistent styling.
- **SWAPI Integration**: Leverages a free, public API for data, avoiding the need for a backend.
- **Component Structure**: Modular components for maintainability.
- **Background Image**: Used star or galaxy image as background color or theme.
- **Pagination**: Simple page-based navigation; could be enhanced with infinite scroll if needed.
