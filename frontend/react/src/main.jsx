import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {ChakraProvider, createStandaloneToast} from "@chakra-ui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./components/login/Login.jsx";
import AuthProvider from "./components/context/AuthContext.jsx";
import OrganizationListComponent from "./components/dashboard/organizationList/OrganizationListComponent.jsx";
import ProtectedRoute from "./components/shared/protectedRoutes/ProtectedRoute.jsx";
import ClassListPage from "./pages/ClassListPage.jsx";
import Register from "./components/register/Register.jsx";
import BrowseClassPage from "./pages/BrowseClassPage.jsx";
import ClassPage from "./pages/ClassPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import BrowseOrganizationPage from "./pages/BrowseOrganizationPage.jsx";
import AdminProtectedRoute from "./components/shared/protectedRoutes/AdminProtectedRoute.jsx";
import Test from "./pages/Test.jsx";
import JoinedOrgProtectedRoute from "./components/shared/protectedRoutes/JoinedOrgProtectedRoute.jsx";
import JoinedClassProtectedRoute from "./components/shared/protectedRoutes/JoinedClassProtectedRoute.jsx";
import UserList from "./pages/UserList.jsx";

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
                <BrowseOrganizationPage/>
            </ProtectedRoute>
    },
    {
        path:`/organization/:name`,
        element:
            <JoinedOrgProtectedRoute>
                <ClassListPage/>
            </JoinedOrgProtectedRoute>
    },
    {
        path:"/users",
        element:
            <AdminProtectedRoute>
                <UserList/>
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
            <JoinedOrgProtectedRoute>
                <BrowseClassPage/>
            </JoinedOrgProtectedRoute>
    },
    {
        path:`/organization/:name/class/:id`,
        element:
            <JoinedClassProtectedRoute>
                <ClassPage/>
            </JoinedClassProtectedRoute>
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
