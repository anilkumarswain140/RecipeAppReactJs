import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/apiService";
import { useDispatch } from "react-redux";
import { storeUser } from "../store/reducers/userSlice";
import { useSpinner } from "../api/spinnerService";
const useLogin = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showSpinner, hideSpinner } = useSpinner();
    const handleUserLogin = async (formData) =>{
        setLoading(false);
        showSpinner();
        try{
            hideSpinner();
            const response = await login(formData);
            setLoading(false);
            console.log("response",response);
            dispatch(storeUser({user: response?.data}))
            localStorage.setItem('authToken', response.data.token);
            navigate('/home');
        }catch(error){
            hideSpinner();
            setLoading(false);
            setError(error.message||'Unable to login');
        }
    }
    return {handleUserLogin, loading, error};
}


export default useLogin;