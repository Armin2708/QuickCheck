import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

const AdminProtectedRoute = ({ children }) => {

    const { isUserAuthenticated,isUserAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuthenticated()){
            navigate("/login")
        }
        if (!isUserAdmin()){
            navigate("/dashboard")
        }
    },[isUserAuthenticated,isUserAdmin,navigate])

    return isUserAuthenticated() && isUserAdmin() ? children : null;
}

export default AdminProtectedRoute;