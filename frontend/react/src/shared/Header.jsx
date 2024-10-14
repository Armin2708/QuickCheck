import {Box, Button, Flex, Image} from "@chakra-ui/react";
import DropDownMenu from "../components/DropDownMenu.jsx";

export default function Header(){
    return(
            <Box backgroundColor={"gray"} marginTop={"15px"} marginLeft={"30px"} marginRight={"30px"}>
                <Flex justifyContent="space-between" alignItems="center" padding="10px">
                    {/* Left-aligned Button with Logo */}
                    <Button boxSize="45px" padding="0" borderRadius={'12px'}>
                            <Image
                                src='././quickchecklogo.png'
                                alt='quickcheck logo'
                                boxSize="100%"  // This makes the image fill the button size
                                objectFit="contain"
                            />
                    </Button>

                    {/* Right-aligned Dropdown Menu */}
                    <DropDownMenu />
                </Flex>
            </Box>
    )
}