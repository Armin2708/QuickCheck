import HomePage from "./pages/HomePage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersListPage from "./pages/UsersListPage.jsx";
import AdminsListPage from "./pages/AdminsListPage.jsx";
import ClassroomsListPage from "./pages/ClassroomsListPage.jsx";
import LoginRegisterPage from "./pages/LoginRegisterPage.jsx";

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path="/"  element={<HomePage/>} />
                <Route path="/users"  element={<UsersListPage/>} />
                <Route path="/admins"  element={<AdminsListPage/>} />
                <Route path="/classrooms"  element={<ClassroomsListPage/>} />
                <Route path="/login"  element={<LoginRegisterPage/>} />
            </Routes>
        </Router>
    )
}

export default App;