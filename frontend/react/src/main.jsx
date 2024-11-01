import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {ChakraProvider, createStandaloneToast} from "@chakra-ui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./components/login/Login.jsx";
import AuthProvider from "./components/context/AuthContext.jsx";
import OrganizationUsersListPage from "./pages/OrganizationUsersListPage.jsx";
import ProtectedRoute from "./components/shared/protectedRoutes/ProtectedRoute.jsx";
import OrganizationUserClassListPage from "./pages/OrganizationUserClassListPage.jsx";
import Register from "./components/register/Register.jsx";
import BrowseOrganizationClassListPage from "./pages/BrowseOrganizationClassListPage.jsx";
import ClassPage from "./pages/ClassPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import BrowseOrganizationListPage from "./pages/BrowseOrganizationListPage.jsx";
import AdminProtectedRoute from "./components/shared/protectedRoutes/AdminProtectedRoute.jsx";
import Test from "./pages/Test.jsx";

const { ToastContainer } = createStandaloneToast();
const router = createBrowserRouter([
    {
        path:"/",
        element: <HomePage/>
    },
    {
        path:"/test",
        element: <Test/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/register",
        element: <Register/>
    },
    {
        path:`/dashboard`,
        element:
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>
    },
    {
        path:`/dashboard/organizations`,
        element:
            <ProtectedRoute>
                <BrowseOrganizationListPage/>
            </ProtectedRoute>
    },
    {
        path:`/organization/:name`,
        element:
            <ProtectedRoute>
                <OrganizationUserClassListPage/>
            </ProtectedRoute>
    },
    {
        path:"/users",
        element:
            <AdminProtectedRoute>
                <OrganizationUsersListPage/>
            </AdminProtectedRoute>
    },
    {
        path:"/profile",
        element:
            <ProtectedRoute>
                <UserProfilePage/>
            </ProtectedRoute>
    },
    {
        path:"/organization/:name/classes",
        element:
            <ProtectedRoute>
                <BrowseOrganizationClassListPage/>
            </ProtectedRoute>
    },
    {
        path:`/organization/:name/class/:id`,
        element:
            <ProtectedRoute>
                <ClassPage/>
            </ProtectedRoute>
    }
])

createRoot(document.getElementById('root'))
    .render(
        <StrictMode>
            <ChakraProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
                <ToastContainer />
            </ChakraProvider>
        </StrictMode>,
)
