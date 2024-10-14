import {Box, Flex} from "@chakra-ui/react";
import DescriptionTab from "../components/DescriptionTab.jsx";
import DropDownMenu from "../components/DropDownMenu.jsx";

export default function Header(){
    return(
            <Box>
                <Flex justifyContent={"center"} marginX={"30px"} marginY={"15px"}>
                    <DescriptionTab/>
                    <DropDownMenu/>
                </Flex>
            </Box>
    )
}