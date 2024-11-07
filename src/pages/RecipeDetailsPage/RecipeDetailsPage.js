import React, { useEffect, useState } from 'react';
import './RecipeDetailsPage.css';
import { addComment, getRecipeDetails, rateRecipe } from '../../api/apiService';
import { useParams } from 'react-router-dom';
import Rating from '../../components/Ratings/AddRating';
import { useSelector } from 'react-redux';
import Toast from '../../components/Notification/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSpinner } from '../../api/spinnerService';

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const [error, setError] = useState('');
    const { showSpinner, hideSpinner } = useSpinner();
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                showSpinner();
                const response = await getRecipeDetails(id);
                setRecipe(response);
                hideSpinner();
            } catch (error) {
                hideSpinner();
                console.error("error fetching records");
                setError(error.message || "error fetching records");
            }
        }
        fetchRecipe();
    }, [id])
    const user = useSelector((state) => state.user);
    const handleRatingChange = async (recipeId, newRating) => {
        // console.log(`Recipe ID: ${recipeId}, New Rating: ${newRating}`);
        // showSpinner();
        try {
            showSpinner();
            const response = await rateRecipe(recipeId, newRating, user?.id);
            setToastMessage('Rating added successfully!');
            setShowToast(true); // Show toast
            setTimeout(() => setShowToast(false), 3000);
            hideSpinner();
            return response;
        } catch (error) {
            hideSpinner();
            console.error('Error submitting rating:', error);

        }
    };

    const handleCommentChange = (e) => {
        const { value } = e.target;
        setComment(value);
    }

    const handleSubmit = async () => {
        showSpinner();
        await addComment(id, comment, user?.id);
        hideSpinner();
        window.location.reload();
    }
    return (
        <div className="recipe-details-container" data-testid="recipecontainer">
            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
            {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />} {/* Show toast if active */}

            {/* Recipe Image */}
            <div className="recipe-header">
                <img
                    className="recipe-image"
                    src={recipe?.image}
                    alt={recipe?.title}
                />
                <div className="recipe-title-info">
                    <h1>{recipe?.title}</h1>
                    <p className="author">
                        By <strong>{recipe?.author?.username}</strong>
                    </p>
                    <div className="recipe-info">
                        <span><strong>Prep Time:</strong> {recipe?.preparationTime} mins</span>
                        <span><strong>Rating:</strong> {recipe?.averageRating} ★</span>
                    </div>
                </div>
            </div>

            {/* Ingredients */}
            <div className="recipe-section">
                <h2>Ingredients</h2>
                <ul className="ingredients-list">
                    {recipe?.ingredients && recipe?.ingredients?.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            {/* Preparation Steps */}
            <div className="recipe-section">
                <h2>Preparation Steps</h2>
                <ol className="steps-list">
                    {recipe?.steps?.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>

            {/* Comments & Ratings Section */}
            <div className="recipe-section">
                <h2>User Ratings</h2>
                <div className="ratings">
                    <p><strong>Average Rating:</strong> {recipe?.averageRating} ★</p>
                    {/* Add a button or form for users to submit ratings */}
                </div>
            </div>
            <h2>Rate this recipe <span>(add your rating)</span></h2>
            <Rating isEditable={true} onRatingChange={(newRating) => handleRatingChange(recipe._id, newRating)} />
            {/* Comments */}
            <div className="recipe-section">
                <h2>Comments</h2>
                <div className="comments">
                    <textarea
                        value={comment}
                        onChange={handleCommentChange} // Update comment on change
                        placeholder="Write your comment here..."
                        rows={4}
                        className='comment-box'
                    />
                    <button onClick={handleSubmit} className='comment-btn'>Submit</button> {/* Submit button */}
                    {recipe?.comments?.length > 0 ? (
                        recipe?.comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <small><FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} /> - {comment.author.username}</small>
                                <p>{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                    {/* Add form for submitting comments */}
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
