import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { isUserInOrganization } from "../../../services/client/users.js";

const JoinedOrgProtectedRoute = ({ children }) => {
    const { isUserAuthenticated, fullUser } = useAuth();
    const navigate = useNavigate();
    const { name } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const checkOrganization = async () => {
        try {
            const res = await isUserInOrganization(name, fullUser?.id);
            return res.data === true;
        } catch (error) {
            console.error("Error checking organization status:", error);
            return false;
        }
    };

    useEffect(() => {
        const verifyAccess = async () => {
            if (!isUserAuthenticated) {
                navigate("/login");
                return;
            }

            if (fullUser?.id) {
                const inOrganization = await checkOrganization();
                if (!inOrganization) {
                    navigate("/dashboard");
                    return;
                }
                setIsLoading(false); // Access granted, stop loading
            }
        };

        if (isUserAuthenticated && fullUser) {
            verifyAccess();
        }
    }, [isUserAuthenticated, navigate, name, fullUser]);

    return !isLoading ? children : null;
};

export default JoinedOrgProtectedRoute;
