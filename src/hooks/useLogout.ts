import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {

    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' })
        navigate('/login');
    }
    return { logout }
}