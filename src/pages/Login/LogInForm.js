import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Email address is invalid';
                }
                break;
            case 'password':
                if (!value) {
                    error = 'Password is required';
                } else if (value.length < 6) {
                    error = 'Password must be at least 6 characters';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate the field on change
        const error = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const { handleUserLogin, loading, error } = useLogin();

    const handleLogin = (e) => {
        e.preventDefault();

        // Perform a final validation check on form submission
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);

        // Proceed with login if no validation errors
        if (Object.keys(newErrors).length === 0) {
            const response = handleUserLogin(formData);
            console.log(response);
        }
    };

    return (
        <div className="flex md:w-1/1 justify-center py-10 pt-12 items-center bg-white">
            <form className="bg-white p-6 w-full max-w-md mx-auto rounded-md shadow-md">
                <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">Hello Again!</h1>
                <p className="text-sm font-normal text-gray-600 mb-7 text-center">Welcome Back</p>

                <div className="mb-4">
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none w-full"
                            type="text"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none w-full"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password}</p>}
                </div>

                {error && <p className="text-red-500 font-semibold text-center mb-4">{error}</p>}

                <button
                    type="submit"
                    className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    Login
                </button>
            </form>

        </div>
    );
};

export default Login;
