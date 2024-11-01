import{
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {getClassroomById, getUserById, getUserByEmail, login as performLogin} from "../../services/client.js";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [fullUser, setFullUser] = useState([]);

    const setUserFromToken = () =>{
        let token = localStorage.getItem("access_token");
        if (token) {
            // Decode token to get the user info
            const decodedToken = jwtDecode(token);

            // Set the user information from the token
            setUser({
                username: decodedToken.sub,
                roles: decodedToken.scopes
            });

            // Use decodedToken.sub for the API call to fetch full user details
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
        } else {
            console.warn("No token found in localStorage.");
        }
    }


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

    const isUserAdmin =() => {
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
    const isUserUser =() => {
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
            isUserAdmin,
            isUserUser,
            setUserFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;