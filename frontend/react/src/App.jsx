import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import Login from "./components/authentication/login/Login.jsx";
import ProtectedRoute from "./components/shared/protectedRoutes/ProtectedRoute.jsx";
import OrganizationPage from "./pages/OrganizationPage.jsx";
import Register from "./components/authentication/register/Register.jsx";
import BrowseClassPage from "./pages/BrowseClassPage.jsx";
import ClassPage from "./pages/ClassPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import BrowseOrganizationPage from "./pages/BrowseOrganizationPage.jsx";
import AdminProtectedRoute from "./components/shared/protectedRoutes/AdminProtectedRoute.jsx";
import Test from "./pages/Test.jsx";
import JoinedOrgProtectedRoute from "./components/shared/protectedRoutes/JoinedOrgProtectedRoute.jsx";
import JoinedClassProtectedRoute from "./components/shared/protectedRoutes/JoinedClassProtectedRoute.jsx";
import UserListPage from "./pages/UserListPage.jsx";
import DashboardWrap from "./components/dashboard/DashboardWrap.jsx";
import Settings from "./pages/Settings.jsx";

const App = () => {
    return (
        <Routes>
            {/* Top-Level Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={
                <AdminProtectedRoute>
                    <Test />
                </AdminProtectedRoute>
            }/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={
                <AdminProtectedRoute>
                    <UserListPage />
                </AdminProtectedRoute>
            }/>
            <Route path="/profile" element={
                <ProtectedRoute>
                    <UserProfilePage />
                </ProtectedRoute>
            } />
            <Route path="/settings" element={
                <ProtectedRoute>
                    <Settings />
                </ProtectedRoute>
            } />

            {/* Dashboard Routes with Persistent Wrapper */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardWrap />
                    </ProtectedRoute>
                }
            >
                {/* Child Routes */}
                <Route index element={<Dashboard />} />
                <Route path="organizations" element={<BrowseOrganizationPage />} />

                <Route
                    path=":name"
                    element={
                        <JoinedOrgProtectedRoute>
                            <OrganizationPage />
                        </JoinedOrgProtectedRoute>
                    }
                />
                <Route
                    path=":name/classes"
                    element={
                        <JoinedOrgProtectedRoute>
                            <BrowseClassPage />
                        </JoinedOrgProtectedRoute>
                    }
                />
                <Route
                    path=":name/:id"
                    element={
                        <JoinedClassProtectedRoute>
                            <ClassPage />
                        </JoinedClassProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;