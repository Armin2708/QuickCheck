import{
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {login as performLogin} from "../../services/client.js";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const setUserFromToken = () =>{
        let token = localStorage.getItem("access_token");
        if (token){
            token = jwtDecode(token);
            setUser({
                username: token.sub,
                roles: token.scopes
            })
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

                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("access_token");
        setUser(null);
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
        console.log(scopes)

        if (!scopes.includes('ADMIN')) {
            return false;
        }
        return true;
    }

    return(
        <AuthContext.Provider value={{
            user,
            login,
            logOut,
            isUserAuthenticated,
            isUserAdmin,
            setUserFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;