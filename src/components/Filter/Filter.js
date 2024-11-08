import React, { useState } from 'react';
import "./Filter.css";

const RecipeFilter = ({ onFilterChange }) => {
  const [rating, setRating] = useState('');
  const [preparationTime, setPrepTime] = useState('');

  // Handle changes for rating
  const handleRatingChange = (e) => {
    const newRating = e.target.value;
    setRating(newRating);
    onFilterChange({ rating: newRating, preparationTime });
  };

  // Handle changes for preparation time
  const handlePrepTimeChange = (e) => {
    const newPrepTime = e.target.value;
    setPrepTime(newPrepTime);
    onFilterChange({ rating, preparationTime: newPrepTime });
  };

  return (
    <div className="filter-section p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="filter-item">
          <label htmlFor="rating" className="block text-sm font-semibold">Minimum Rating (≥):</label>
          <select
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            className="w-full border rounded-md p-2 mt-1"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="preparationTime" className="block text-sm font-semibold">Maximum Preparation Time (≤ minutes):</label>
          <select
            id="preparationTime"
            value={preparationTime}
            onChange={handlePrepTimeChange}
            className="w-full border rounded-md p-2 mt-1"
          >
            <option value="">Any Time</option>
            <option value="15">Up to 15 min</option>
            <option value="30">Up to 30 min</option>
            <option value="45">Up to 45 min</option>
            <option value="60">Up to 1 hour</option>
            <option value="120">Up to 2 hours</option>
          </select>
        </div>

      </div>
    </div>

  );
};

export default RecipeFilter;
