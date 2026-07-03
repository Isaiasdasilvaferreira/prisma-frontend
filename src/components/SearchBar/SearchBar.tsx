import React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = 'Buscar...' }: SearchBarProps) {
  return (
    <div className="searchbar">
      <Search size={16} className="searchbar-icon" />
      <input type="text" placeholder={placeholder} className="searchbar-input" />
      <kbd className="searchbar-kbd">⌘K</kbd>
    </div>
  );
}