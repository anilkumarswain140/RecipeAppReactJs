import React, { useEffect, useState } from 'react';
import RecipeCard from './Recipe/Recipe';
import { useSelector, useDispatch } from 'react-redux';
import { addRecipe, fetchRecipes } from '../../../store/reducers/recipeSlice';
import AddRecipeButton from '../../../components/AddRecipe/addRecipeButton';
import RecipeFilter from '../../../components/Filter/Filter';
import Pagination from '../../../components/Pagination/Pagination';
import './RecipeGrid.css';

const RecipeGrid = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error, totalPages, currentPage } = useSelector((state) => state.recipes);
  // State to hold filter criteria
  const [filter, setFilter] = useState({ rating: '', preparationTime: '' });

  // Fetch recipes when the component mounts or filter changes
  useEffect(() => {
    
    if (filter.rating || filter.preparationTime) {
      dispatch(fetchRecipes(filter)); // Search recipes based on filter
    } else {
      dispatch(fetchRecipes({ page: currentPage, limit: 10 })); // Fetch all recipes when there's no filter
    }
  }, [dispatch, filter]);

  // Function to handle adding a new recipe
  const handleAddRecipe = async (newRecipe) => {
    await dispatch(addRecipe(newRecipe)).unwrap(); // Add the new recipe
    dispatch(fetchRecipes()); // Refresh recipes after adding a new one
  };

  // Function to handle filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  // function to handle pagination changes
  const handlePageChange = (page) => {
    dispatch(fetchRecipes({ page, limit: 10 })); // Fetch recipes for the selected page
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative">
      {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
      {/* Pass handleFilterChange to RecipeFilter */}
      <RecipeFilter onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 recipe-content">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            title={recipe.title}
            ingredients={recipe.ingredients}
            image={recipe.image}
            rating={recipe.averageRating}
            authorName={recipe?.author?.username}
            preparationTime={recipe.preparationTime}
            id={recipe._id}
          />
        ))}
      </div>

      {/* Add Recipe Button */}
      <AddRecipeButton addRecipe={handleAddRecipe} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RecipeGrid;
