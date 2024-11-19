import {background, Box, Button, Input, useColorModeValue} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {FiSearch} from "react-icons/fi";

export default function UserListSearchBar({fetch,search, setSearch}){

    const handleChange = (event) =>{
        setSearch(event.target.value)
        fetch(event.target.value)
    }

    return(
        <Box
            display="flex"
            alignItems="center"
            borderRadius="full"
            padding="10px"
            paddingLeft={"0px"}
            overflow="hidden" // Ensure the container doesn't grow unnecessarily
            bg={useColorModeValue("white","#1F1F1F")}
            maxW={"480px"}
            width={"100%"}
            height={"40px"}
            gap={"10px"}
        >
            <Button borderRadius={"full"} padding={"0px"} _hover={{ background: "transparent" }} background={"transparent"}>
                <FiSearch />
            </Button>

            <Box
                flex="1" // Allow the input to take available space
                overflow="hidden" // Prevent horizontal overflow
            >
                <Input
                    variant="unstyled"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search..."
                    textOverflow="ellipsis" // Truncate overflowing text
                    whiteSpace="nowrap" // Keep the text on a single line
                    overflowX="auto" // Allow horizontal scrolling for long text
                />
            </Box>
        </Box>
    )
}