import DescriptionTab from "../components/DescriptionTab.jsx";
import {Box, Flex} from "@chakra-ui/react";
import Header from "../shared/Header.jsx";

export default function HomePage(){
    return(
        <>
            <Header/>
            <Box backgroundColor={"gray"} marginTop={"15px"} marginLeft={"30px"} marginRight={"30px"}>
                <Flex justifyContent="center">
                    <DescriptionTab />
                </Flex>
            </Box>
        </>
    )
}