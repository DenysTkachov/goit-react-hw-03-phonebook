import React from 'react';

export function Filter({ filter, handleFilterChange }) {
  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Search contacts..."
    />
  );
}