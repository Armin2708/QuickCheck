import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import {getClassById, isUserInClass, isUserInOrganization} from "../../../services/client.js";

const JoinedClassProtectedRoute = ({ children }) => {
    const { isUserAuthenticated, fullUser } = useAuth();
    const navigate = useNavigate();
    const { name,id } = useParams();
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

    const checkClass = async () => {
        try {
            const res = await isUserInClass(id, fullUser?.id);
            return res.data === true;
        } catch (error) {
            console.error("Error checking organization status:", error);
            return false;
        }
    };

    const checkClassProfessor = async () => {
        try {
            const res = await getClassById(id);
            console.log(fullUser?.id)
            console.log(res.data.professorId)
            return res.data.professorId === fullUser?.id;
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

                const inClass = await checkClass();
                const classProfessor = await checkClassProfessor();

                if (!inClass && !classProfessor) {
                    navigate(`/organization/${name}`)
                    return
                }

                setIsLoading(false); // Access granted, stop loading
            }
        };

        if (isUserAuthenticated && fullUser) {
            verifyAccess();
        }
    }, [isUserAuthenticated, navigate, name, fullUser, id]);

    return !isLoading ? children : null;
};

export default JoinedClassProtectedRoute;
