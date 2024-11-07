import { BASE_URL } from '../utils/constants';
import axios from 'axios';

// Create the axios instance with the base URL
const api = axios.create({
    baseURL: BASE_URL,
});

// Add a request interceptor to dynamically set the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Get token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Add token to Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if it's a server error or unauthorized error, etc.
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                // Handle unauthorized errors (e.g., redirect to login or show alert)
                alert("Session expired. Please log in again.");
            } else if (status >= 500) {
                // Handle server errors
                alert("Something went wrong on our end. Please try again later.");
            }
        } else {
            // Handle network errors or unknown issues
            alert("Network error. Please check your connection.");
        }

        return Promise.reject(error);
    }
);

// Function for user sign up
export const signUpUser = async (formData) => {
    try {
        const response = await api.post('auth/register', formData);
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        const message = error.response?.data?.message || "Error during signup";
        throw new Error(message);
    }
};

// Function for user login
export const login = async (formData) => {
    try {
        const response = await api.post('auth/login', formData);
        return response;
    } catch (error) {
        console.error('Error during login');
        const message = error.response?.data?.message || error.message || "Error during login";
        throw new Error(message);
    }
}

// Function to get recipes
export const getRecipes = async (params = {}) => {
    try {
        // Construct the query string from the params object
        const queryString = new URLSearchParams(params).toString();
        const response = await api.get(`recipes?${queryString}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching Recipes:', error);
        const message = error.response?.data?.message || error.message || "Error fetching Recipes";
        throw new Error(message);
    }
};

// Function to create a new recipe
export const createRecipe = async (recipe) => {
    try {
        const response = await api.post('recipes', recipe);
        console.log(response);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Error creating recipe";
        throw new Error(message);
    }
};

// Function to get recipes
export const getRecipeDetails = async (recipeId) => {
    try {
        const response = await api.get(`recipes/recipe/${recipeId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching Recipes:', error);
        const message = error.response?.data?.message || "Error fetching Recipes";
        throw new Error(message);
    }
};

// Function to rate the Recipe
export const rateRecipe = async (recipeId, newRating, userId) =>{
    try{
        const payload = {
            value: newRating,
            user: {
                "_id": userId
            }
        }
        const response = await api.post(`recipes/${recipeId}/rate`,payload);
        return response;
    }catch(error){
        console.error("Something wrong");
        const message = error.response?.data?.message || "Something wrong please try again";
        throw new Error(message);
    }
}

// Function to add Comment
export const addComment = async (recipeId, comment) =>{
    try{
        const payload = {
            content: comment,
            recipeId: recipeId,
        }
        const response = await api.post('comments',payload);
        return response;
    }catch(error){
        console.error("Something wrong");
        const message = error.response?.data?.message || "Something wrong please try again";
        throw new Error(message);
    }
}