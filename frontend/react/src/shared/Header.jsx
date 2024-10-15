import {Box, Button, Flex, Image, Text} from "@chakra-ui/react";
import DropDownMenu from "../components/DropDownMenu.jsx";
import {useNavigate} from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/"); // Change to the desired route
    };
    return(
            <Box marginTop={"15px"} marginLeft={"30px"} marginRight={"30px"}>
                <Flex justifyContent="space-between" alignItems="center" padding="10px">
                    <Button boxSize="45px" padding="0" borderRadius={'12px'} onClick={handleHome}>
                            <Image
                                src='././quickchecklogo.png'
                                alt='quickcheck logo'
                                boxSize="100%"
                                objectFit="contain"
                            />
                    </Button>
                    <Text fontSize="xl" fontWeight="bold">QuickCheck</Text>
                    <DropDownMenu />
                </Flex>
            </Box>
    )
}