import {Box, useColorModeValue} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {IoAddOutline} from "react-icons/io5";

export default function BrowseOrganizationButton(){

    return(
        <Box
            borderRadius="8px"
            width="100px"
            height="34px" // Use "height" instead of "maxh" for consistency
            bg={()=>useColorModeValue("white","#1D1D1D")}
            color="#7e3bb5"
            borderLeft="2px"
            borderColor="#7e3bb5" // Correct capitalization of "borderColor"
            display="flex" // Flexbox for centering
            alignItems="center" // Center vertically
            justifyContent="center" // Center horizontally
            _hover={{
                transform: "scale(1.05)", // Scale up slightly on hover
                transition: "transform 0.2s ease-in-out", // Smooth transition effect
            }}
        >
            <AddIcon color="#7e3bb5" boxSize="50%" /> {/* Scales icon size */}
        </Box>


    )
}

