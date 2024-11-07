import React from 'react';

const StarRating = ({ rating, maxRating = 5 }) => {
  // Ensure rating does not exceed maxRating and is non-negative
  const validRating = Math.max(0, Math.min(rating, maxRating)); 
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 !== 0;
  const emptyStars = Math.max(maxRating - fullStars - (hasHalfStar ? 1 : 0), 0); // Ensure emptyStars is not negative

  return (
    <div className="star-rating">
      {/* Full Stars */}
      {fullStars > 0 && [...Array(fullStars)].map((_, index) => (
        <span key={index}>&#9733;</span> // Unicode for filled star
      ))}

      {/* Half Star */}
      {hasHalfStar && <span>&#9734;</span>} {/* You might want to use a different Unicode character for half star */}

      {/* Empty Stars */}
      {emptyStars > 0 && [...Array(emptyStars)].map((_, index) => (
        <span key={index + fullStars}>&#9734;</span> // Unicode for empty star
      ))}
    </div>
  );
};

export default StarRating;
