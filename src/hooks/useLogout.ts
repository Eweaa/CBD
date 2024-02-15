import { useNavigate } from "react-router";

export const useLogout = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    }
    return { logout }
}