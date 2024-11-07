import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeGrid from './Recipes/RecipeGrid';
import { fetchRecipes, addRecipe } from '../../store/reducers/recipeSlice';

// Mock the Redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock the components
jest.mock('./Recipes/Recipe/Recipe.js', () => () => <div>RecipeCard</div>);
jest.mock('../../components/AddRecipe/addRecipeButton.js', () => () => <button>Add Recipe</button>);
jest.mock('../../components/Filter/Filter', () => ({ onFilterChange }) => (
  <button onClick={() => onFilterChange({ rating: '5' })}>Filter</button>
));
jest.mock('../../components/Pagination/Pagination', () => ({ onPageChange }) => (
  <button onClick={() => onPageChange(2)}>Next Page</button>
));
jest.mock('../../store/reducers/recipeSlice.js', () => ({
  addRecipe: jest.fn(() => ({ 
    type: 'ADD_RECIPE', 
    payload: { /* mock payload here */ } 
  })),
  fetchRecipes: jest.fn(() => ({
    type: 'FETCH_RECIPES',
    payload: { /* mock payload for fetchRecipes */ }
  })),
}));
describe('RecipeGrid', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    useSelector.mockReturnValue({ loading: true, recipes: [], error: null });
    render(<RecipeGrid />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error message', () => {
    useSelector.mockReturnValue({ loading: false, recipes: [], error: 'An error occurred' });
    render(<RecipeGrid />);
    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });

  test('renders recipes when available', () => {
    useSelector.mockReturnValue({
      loading: false,
      recipes: [
        { title: 'Recipe 1', ingredients: [], image: '', averageRating: 5, author: { username: 'User1' }, preparationTime: '30min', _id: '1' },
        { title: 'Recipe 2', ingredients: [], image: '', averageRating: 4, author: { username: 'User2' }, preparationTime: '45min', _id: '2' },
      ],
      error: null,
      totalPages: 1,
      currentPage: 1,
    });
  
    render(<RecipeGrid />);
  
    // Check that the RecipeCard component is rendered twice
    expect(screen.getAllByText('RecipeCard')).toHaveLength(2);
    
    // Alternatively, check for a specific role or class if applicable
    // expect(screen.getAllByRole('heading', { name: /RecipeCard/i })).toHaveLength(2);
  });
  

  // test('handles filter change', () => {
  //   useSelector.mockReturnValue({
  //     loading: false,
  //     recipes: [],
  //     error: null,
  //     totalPages: 1,
  //     currentPage: 1,
  //   });
  //   render(<RecipeGrid />);
    
  //   // Simulate filter change
  //   fireEvent.click(screen.getByText(/filter/i));
  //   expect(dispatch).toHaveBeenCalledWith(fetchRecipes({ rating: '5' }));
  // });

  test('handles pagination', () => {
    useSelector.mockReturnValue({
      loading: false,
      recipes: [],
      error: null,
      totalPages: 3,
      currentPage: 1,
    });
    render(<RecipeGrid />);

    // Simulate page change
    fireEvent.click(screen.getByText(/next page/i));
    expect(dispatch).toHaveBeenCalledWith(fetchRecipes({ page: 2, limit: 10 }));
  });

//   test('handles adding a new recipe', async () => {
//     useSelector.mockReturnValue({
//         loading: false,
//         recipes: [],
//         error: null,
//         totalPages: 1,
//         currentPage: 1,
//     });
//     render(<RecipeGrid />);

//     // Simulate adding a new recipe
//     fireEvent.click(screen.getByText(/add recipe/i));
//     expect(dispatch).toHaveBeenCalledWith(addRecipe());
// });


});
