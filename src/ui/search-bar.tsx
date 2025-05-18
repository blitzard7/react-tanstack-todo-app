import { type ChangeEvent } from 'react';

interface SearchBarProps {
  searchQuery: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ searchQuery, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 pl-10 pr-4 bg-white text-gray-900  placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-colors"
        placeholder={placeholder}
        value={searchQuery}
        onChange={onChange}
      />
    </div>
  );
}

export { SearchBar };
