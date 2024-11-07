import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/reducers/userSlice';
import { fetchRecipes } from '../../store/reducers/recipeSlice';
import { debounce } from 'lodash';
import { useSpinner } from '../../api/spinnerService';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSpinner, hideSpinner } = useSpinner();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async() => {
    showSpinner();
    console.log('User logged out');
    localStorage.removeItem('authToken');
    setDropdownOpen(false);
    await dispatch(logout());
    hideSpinner();
    navigate('/');
  };

  // Debounced function for searching recipes
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term) {
        dispatch(fetchRecipes({ search: term })); // Dispatch the search action
      } else {
        dispatch(fetchRecipes()); // Fetch all recipes if no term
      }
    }, 1000), 
    [dispatch]
  );

  // Handle changes in the search input
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value); // Call the debounced function
  };

  // Cleanup function to cancel the debounced call if the component unmounts
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <header className="bg-cyan-500 shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white"><Link to={'/home'}>Recipe Market</Link></h1>

        <div className="flex items-center space-x-4">
          <input
            value={searchTerm}
            onChange={handleChange}
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />

          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <img
                src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-[1]">
                <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                  Logout
                </div>
                {/* Add more options if needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
