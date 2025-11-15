import React from 'react';

interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, hasNext, hasPrevious, onNext, onPrevious }) => {
  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
        Previous
      </button>
      <span className="text-lg font-medium">Page {currentPage}</span>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
// Add this if needed for isolatedModules (though it should work without)
export {};