import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {Box, ChakraProvider, createStandaloneToast, useColorModeValue} from "@chakra-ui/react";
import App from "./App.jsx";
import AuthProvider from "./components/context/AuthContext.jsx";
import {BrowserRouter} from "react-router-dom";

const { ToastContainer } = createStandaloneToast();

createRoot(document.getElementById('root'))
    .render(
        <StrictMode>
            <ChakraProvider >
                    <AuthProvider>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </AuthProvider>
                    <ToastContainer />
            </ChakraProvider>
        </StrictMode>,
)
