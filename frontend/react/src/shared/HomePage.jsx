import DescriptionTab from "../components/DescriptionTab.jsx";
import {Box, Flex} from "@chakra-ui/react";

export default function HomePage(){
    return(
        <Box backgroundColor={"gray"} marginTop={"15px"} marginLeft={"30px"} marginRight={"30px"}>
            <Flex justifyContent="center">
                <DescriptionTab />
            </Flex>
        </Box>
    )
}