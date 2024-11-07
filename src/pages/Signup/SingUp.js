import { useState } from "react";
import { Link } from 'react-router-dom';
import useSignUp from "../../hooks/useSignUp";
const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { handleSignUp, loading, error } = useSignUp();

    // Handle input change and validate the field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    // Validate a specific field
    const validateField = (name, value) => {
        let errorMsg = '';

        if (name === 'username') {
            if (!value) errorMsg = 'Username is required';
            else if (value.length < 3) errorMsg = 'Username must be at least 3 characters';
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) errorMsg = 'Email is required';
            else if (!emailRegex.test(value)) errorMsg = 'Invalid email format';
        }

        if (name === 'password') {
            if (!value) errorMsg = 'Password is required';
            else if (value.length < 6) errorMsg = 'Password must be at least 6 characters';
            else if (!/[A-Z]/.test(value)) errorMsg = 'Password must contain at least one uppercase letter';
            else if (!/[0-9]/.test(value)) errorMsg = 'Password must contain at least one number';
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMsg
        }));
    };

    // Validate the entire form on submit
    const validateForm = () => {
        const newErrors = {
            username: '',
            email: '',
            password: ''
        };

        if (!formData.username) newErrors.username = 'Username is required';
        else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Password must contain at least one uppercase letter';
        else if (!/[0-9]/.test(formData.password)) newErrors.password = 'Password must contain at least one number';

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSignUp(formData);
        }
    };

    return (
        <div className="h-screen md:flex">
            <div
                className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans">Recipe market</h1>
                    <p className="text-white mt-1">Add your innovations and explore more</p>
                    <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Explore</button>
                </div>
                <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                <form className="bg-white">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

                    {/* Username Field */}
                    <div className="flex flex-col mb-4">
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                        </div>
                        {errors.username && <span className="text-red-500 text-sm mt-1">{errors.username}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col mb-4">
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                        </div>
                        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col mb-4">
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        </div>
                        {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                    </div>

                    {/* Signup Button and Error Message */}
                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                    <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2" onClick={handleSubmit} disabled={loading}>Signup</button>

                    {/* Login Link */}
                    <p className="text-sm text-center mt-4">Already have an account?
                        <Link to={'/login'} className="text-blue-500 hover:underline ml-1">Login</Link>
                    </p>
                </form>
            </div>

        </div>
    )
}

export default SignUp;