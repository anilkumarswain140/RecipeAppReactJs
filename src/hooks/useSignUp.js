import { useState } from "react"
import { signUpUser } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "../api/spinnerService";


const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { showSpinner, hideSpinner } = useSpinner();
    const handleSignUp = async (formData) => {
        setLoading(true);
        try {
            showSpinner();
            const data = await signUpUser(formData);
            console.log(data);
            setLoading(false);
            navigate('/login');
            hideSpinner();
        } catch (error) {
            hideSpinner();
            setError(error.message || 'Failed to sign up');
            setLoading(false);
        }
    }
    return { handleSignUp, error, loading };
}

export default useSignUp;