import {
Wrap
} from "@chakra-ui/react";

import React from "react";

import Header from "../headerFooter/Header.jsx";
import Footer from "../headerFooter/Footer.jsx";

export default function HeaderFooter({children}) {
    return (
        <Wrap>
            <Header/>
            {children}
            <Footer/>
        </Wrap>


    );
}
