import {
    Flex,
    Wrap
} from "@chakra-ui/react";

import React from "react";

import Header from "./headerFooter/Header.jsx";
import Footer from "./headerFooter/Footer.jsx";

export default function HeaderFooter({children}) {
    return (
        <Flex
            direction="column"
            minHeight="100vh"
            width="100%"
        >
            <Header />
            <Flex flex="1" align="center" justify="center">
                {children}
            </Flex>
            <Footer />
        </Flex>


    );
}
