import{
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {
    getClassroomById,
    getUserById,
    getUserByEmail,
    login as performLogin,
    isUserInOrganization, isUserInClass
} from "../../services/client.js";
import {jwtDecode} from "jwt-decode";
import {useParams} from "react-router-dom";

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [fullUser, setFullUser] = useState([]);

    const [loadingFullUser, setLoadingFullUser] = useState(true);

    const setUserFromToken = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            const decodedToken = jwtDecode(token);

            setUser({
                username: decodedToken.sub,
                roles: decodedToken.scopes,
            });

            setLoadingFullUser(true); // Start loading full user
            getUserByEmail(decodedToken.sub)
                .then((res) => {
                    if (res.data) {
                        setFullUser(res.data);
                    } else {
                        console.error("Expected user data but got:", res.data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                })
                .finally(() => setLoadingFullUser(false)); // Stop loading full user
        } else {
            console.warn("No token found in localStorage.");
            setLoadingFullUser(false); // No user to fetch
        }
    };



    useEffect(() => {
        setUserFromToken()
    },[]);

    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.headers["authorization"];
                localStorage.setItem("access_token",jwtToken);

                const decodedToken = jwtDecode(jwtToken);

                setUser({
                    username: decodedToken.sub,
                    roles: decodedToken.scopes
                })
                console.log(user)

                getUserByEmail(decodedToken.sub)
                    .then(res => {
                        if (res.data) {
                            setFullUser(res.data);
                        } else {
                            console.error('Expected user data but got:', res.data);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user:', error);
                    });

                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("access_token");
        setUser(null);
        setFullUser(null);
    }

    const isUserAuthenticated =() => {
        const token = localStorage.getItem("access_token");
        if (!token){
            return false;
        }
        const decodedToken = jwtDecode(token);
        if (Date.now() > decodedToken.exp * 1000){
            logOut()
            return false
        }
        return true;
    }

    const isAdmin =() => {
        const token = localStorage.getItem("access_token");
        if (!token){
            return false;
        }
        const decodedToken = jwtDecode(token);
        const scopes = Array.isArray(decodedToken.scopes[0]) ? decodedToken.scopes.flat() : decodedToken.scopes;

        if (!scopes.includes('ADMIN')) {
            return false;
        }
        return true;
    }

    const isInstructor =() => {
        const token = localStorage.getItem("access_token");
        if (!token){
            return false;
        }
        const decodedToken = jwtDecode(token);
        const scopes = Array.isArray(decodedToken.scopes[0]) ? decodedToken.scopes.flat() : decodedToken.scopes;

        if (!scopes.includes('INSTRUCTOR')) {
            return false;
        }
        return true;
    }

    const isUser =() => {
        const token = localStorage.getItem("access_token");
        if (!token){
            return false;
        }
        const decodedToken = jwtDecode(token);
        const scopes = Array.isArray(decodedToken.scopes[0]) ? decodedToken.scopes.flat() : decodedToken.scopes;

        if (!scopes.includes('USER')) {
            return false;
        }
        return true;
    }


    return(
        <AuthContext.Provider value={{
            user,
            fullUser,
            login,
            logOut,
            isUserAuthenticated,
            isAdmin,
            isInstructor,
            isUser,
            setUserFromToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;