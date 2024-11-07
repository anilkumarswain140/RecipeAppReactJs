
# Recipe App Documentation

This Recipe App is a web-based platform where users can add new recipes, view a list of recipes, rate other users' recipes, and add comments to recipes. The application is built using React and Axios for handling API requests.

## Features

### 1. **Add Recipes**
   - Users can add new recipes by filling in the recipe details (title, ingredients, steps, etc.).
   - The recipe is sent to the backend using an API call (`POST /recipes`).
   - Upon success, the new recipe will be stored in the database and listed in the recipe list.

### 2. **View List of Recipes**
   - Users can view a paginated list of all recipes with details such as title, description, and rating.
   - Each recipe is fetched from the backend API (`GET /recipes`) and displayed in a grid or list format.

### 3. **Rate Other Users' Recipes**
   - Logged-in users can rate recipes created by other users.
   - The rating is stored as a numerical value (e.g., 1-5 stars) and sent to the backend (`POST /recipes/{recipeId}/rate`).
   - The recipe's overall rating is recalculated and updated based on new user ratings.

### 4. **Add Comments to Recipes**
   - Users can add comments to any recipe.
   - The comment is sent to the backend (`POST /comments`), associated with the recipe, and displayed under the recipe.
   - Users can view all comments under a recipe in the recipe detail page.

## Process to Run the App

### Prerequisites
Ensure you have the following installed:
- Node.js (v18 or above)
- npm (Node package manager)

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   Run the following command to install all the required npm packages:
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```
   This will start the app in development mode. Open [http://localhost:3001](http://localhost:3001) to view the app in your browser.

4. **Build for Production**
   If you want to create a production build, run the following command:
   ```bash
   npm run build
   ```
   This will bundle your app for production and optimize the build for best performance.

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode. Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run test`
Launches the test runner in interactive watch mode.

### Error Handling
If any error occurs during API calls (such as adding a recipe, rating a recipe, or fetching data), an error message is displayed to the user with feedback on what went wrong.

---

For further information, refer to the [React Documentation](https://reactjs.org/).
