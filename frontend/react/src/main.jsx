import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {ChakraProvider, createStandaloneToast} from "@chakra-ui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./components/login/Login.jsx";
import AuthProvider from "./components/context/AuthContext.jsx";
import UsersListPage from "./pages/UsersListPage.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import ClassroomsListPage from "./pages/ClassroomsListPage.jsx";
import Register from "./components/register/Register.jsx";
import AdminProtectedRoute from "./components/shared/AdminProtectedRoute.jsx";

const { ToastContainer } = createStandaloneToast();
const router = createBrowserRouter([
    {
        path:"/",
        element: <HomePage/>
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
        path:"/users",
        element:
            <ProtectedRoute>
                <UsersListPage/>
            </ProtectedRoute>
    },
    {
        path:"/classrooms",
        element:
            <AdminProtectedRoute>
                <ClassroomsListPage/>
            </AdminProtectedRoute>
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
