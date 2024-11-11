import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

const AdminProtectedRoute = ({ children }) => {

    const { isUserAuthenticated,isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuthenticated()){
            navigate("/login")
        }
        if (!isAdmin()){
            navigate("/dashboard")
        }
    },[isUserAuthenticated,isAdmin,navigate])

    return isUserAuthenticated() && isAdmin() ? children : null;
}

export default AdminProtectedRoute;