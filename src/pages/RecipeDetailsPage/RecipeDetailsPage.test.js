import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecipeDetails from './RecipeDetailsPage';
import { getRecipeDetails } from '../../api/apiService';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSpinner } from '../../api/spinnerService';

// Mocking the API calls
jest.mock('../../api/apiService', () => ({
  getRecipeDetails: jest.fn(),
}));

// Mocking the spinner service
jest.mock('../../api/spinnerService.js', () => ({
  useSpinner: jest.fn(),
}));

// Mocking useParams to simulate URL parameters
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Setup mock store with initial user data
const mockStore = configureStore();
const store = mockStore({
  user: { id: '123', username: 'testuser' },
});

describe('RecipeDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
    useParams.mockReturnValue({ id: '1' });
  });

  test('should fetch and display recipe details on page load', async () => {
    // Mock spinner functions
    const showSpinner = jest.fn();
    const hideSpinner = jest.fn();
    useSpinner.mockReturnValue({ showSpinner, hideSpinner });

    // Mock the API response for getRecipeDetails
    getRecipeDetails.mockResolvedValueOnce({
      title: 'Test Recipe',
      author: { username: 'Test Author' },
      preparationTime: 30,
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      steps: ['Step 1', 'Step 2'],
    });

    // Render the component with necessary providers and router
    render(
      <Provider store={store}>
        <Router>
          <RecipeDetails />
        </Router>
      </Provider>
    );

    // Check if showSpinner is called when the fetch starts
    expect(showSpinner).toHaveBeenCalled();

    // Wait for recipe details to load and hide the spinner
    await waitFor(() => {
      expect(getRecipeDetails).toHaveBeenCalledWith('1'); // Ensure fetch is called with correct id
      expect(hideSpinner).toHaveBeenCalled(); // Ensure spinner hides after fetch
    });

    // Check if recipe title, author, and other details are displayed as expected
    expect(screen.getByTestId('recipecontainer')).toBeInTheDocument();
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText(/Test Recipe/)).toBeInTheDocument();
    expect(screen.getByText('Ingredient 1')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  test('should display error message if fetch fails', async () => {
    // Mock spinner functions
    const showSpinner = jest.fn();
    const hideSpinner = jest.fn();
    useSpinner.mockReturnValue({ showSpinner, hideSpinner });

    // Simulate a fetch error
    const errorMessage = "Error fetching records";
    getRecipeDetails.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <Provider store={store}>
        <Router>
          <RecipeDetails />
        </Router>
      </Provider>
    );

    // Check if showSpinner is called initially
    expect(showSpinner).toHaveBeenCalled();

    // Wait for the error to be handled
    await waitFor(() => {
      expect(getRecipeDetails).toHaveBeenCalledWith('1');
      expect(hideSpinner).toHaveBeenCalled();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
