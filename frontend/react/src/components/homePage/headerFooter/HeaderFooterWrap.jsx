import {
    Box,
    Flex,
    Wrap
} from "@chakra-ui/react";

import React from "react";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function HeaderFooterWrap({children}) {
    return (
        <Box
            direction="column"
            minHeight="100%"
            minWidth="100%"
        >
            <Header />
            {children}
            <Footer />
        </Box>


    );
}
