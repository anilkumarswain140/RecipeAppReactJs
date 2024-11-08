import { Link } from "react-router-dom";
import StarRating from "../../../../components/Ratings/StarRating";
import './Recipe.css';
const RecipeCard = ({ id, title, ingredients, image, rating, authorName, preparationTime }) => {
    return (
        <Link to={`/recipedetails/${id}`} tabindex="0" lang="en">
            <div className="bg-white rounded-lg shadow-md overflow-hidden" tabindex="0">
                <img
                    className="w-full h-48 object-cover"
                    src={image}
                    alt={title}
                    tabindex="0"
                    aria-label={`Image of the recipe: ${title}`}
                />

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Left column - Title, ingredients, and rating */}
                    <div className="p-4" tabindex="0">
                        <h2 className="text-lg font-bold" tabindex="0">{title}</h2>
                        <p className="prep-time" tabindex="0">Preparation Time <span>{preparationTime} mins</span></p>
                        <StarRating rating={rating} />
                    </div>

                    {/* Right column - Author section */}
                    <div className="flex items-center justify-center p-4 border-l-2" tabindex="0">
                        <div className="text-center">
                            <p className="text-sm text-gray-600" tabindex="0">Recipe by:</p>
                            <p
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                tabindex="0"
                                aria-label={`Author: ${authorName}`}
                            >
                                {authorName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default RecipeCard;