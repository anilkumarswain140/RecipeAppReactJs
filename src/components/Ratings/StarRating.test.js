// StarRating.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating Component', () => {
  test('renders correct number of full stars for integer rating', () => {
    render(<StarRating rating={3} />);
    const fullStars = screen.getAllByText('★'); // Get filled stars
    expect(fullStars.length).toBe(3); // Expect 3 filled stars
  });

  test('renders correct number of full stars for half star rating', () => {
    render(<StarRating rating={4.5} />);
    const fullStars = screen.getAllByText('★');
    const halfStar = screen.getByText('☆'); // Get half star
    expect(fullStars.length).toBe(4); // Expect 4 filled stars
    expect(halfStar).toBeInTheDocument(); // Expect half star to be rendered
  });

  test('renders correct number of empty stars', () => {
    render(<StarRating rating={2} maxRating={5} />);
    const emptyStars = screen.getAllByText('☆'); // Get empty stars
    expect(emptyStars.length).toBe(3); // Expect 3 empty stars
  });

  test('does not render more stars than maxRating', () => {
    render(<StarRating rating={10} maxRating={5} />);
    const fullStars = screen.getAllByText('★');
    expect(fullStars.length).toBe(5); // Expect maxRating number of filled stars
  });

  test('renders 0 stars for negative rating', () => {
    render(<StarRating rating={-1} />);
    const fullStars = screen.queryAllByText('★');
    const emptyStars = screen.getAllByText('☆');
    expect(fullStars.length).toBe(0); // Expect 0 filled stars
    expect(emptyStars.length).toBe(5); // Expect maxRating number of empty stars
  });

  test('renders correct number of stars when rating is equal to maxRating', () => {
    render(<StarRating rating={5} maxRating={5} />);
    const fullStars = screen.getAllByText('★');
    expect(fullStars.length).toBe(5); // Expect all stars to be filled
  });
});
