import {Box, Button, Divider, Spacer, Switch, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {HiOutlineHome} from "react-icons/hi";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {LuSettings} from "react-icons/lu";
import {useAuth} from "./context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function PageWrap({children,pageName}){
    return(
        <Box
            padding="8px"
            height="100vh" /* Full viewport height */
            gap="10px"
            display="flex"
            flexDirection="row"
            boxSizing="border-box" /* Ensures padding is included in the total height calculation */
            bg={useColorModeValue("white","black")}
        >
            <PageBar pageName={pageName}/>
            <Box
                width="100%"
                height="100%"
                borderRadius="12px"
                display="flex"
                flexDir="column"
                gap="20px"
                bg={useColorModeValue('gray.100', '#121212')}
                p="12px"
                paddingX={"20px"}
                overflow="auto" /* Prevent the shadow from clipping outside the container */
                position="relative" /* Ensure the shadow is correctly positioned */
            >

                {children}

                <Spacer/>
                <Box width="100%">
                    <Text fontSize="20px" textAlign={"center"}>© Quick Check - All Rights Reserved</Text>
                </Box>
            </Box>
        </Box>
    )
}

function PageBar({pageName}) {
    const { colorMode,toggleColorMode } = useColorMode();
    const {isAdmin } = useAuth();
    const navigate = useNavigate();

    return (

        <Box display="flex" flexDirection="column" h="100%" maxH="100%" w="400px" gap="10px">
            <Box bg={useColorModeValue('gray.100', '#121212')} borderRadius="12px" p="12px">
                <SideBarPageButton onClick={() =>navigate("/")}>
                    <HiOutlineHome size="24px" />
                    <ButtonText>Home</ButtonText>
                </SideBarPageButton>
                <SideBarPageButton onClick={() =>navigate("/dashboard")}>
                    <MdOutlineSpaceDashboard size="24px" />
                    <ButtonText>Dash Board</ButtonText>
                </SideBarPageButton>
                {isAdmin() && (
                    <SideBarPageButton onClick={() =>navigate("/users")}>
                        <FiUsers size="24px" />
                        <ButtonText>Users</ButtonText>
                    </SideBarPageButton>
                )}
            </Box>
            <Box
                flex={1}
                bg={useColorModeValue('gray.100', '#121212')}
                borderRadius="12px"
                p="12px"
                display="flex"
                flexDirection="column"
                gap="10px"
                overflow="hidden"
            >

                <Text fontWeight="semibold" fontSize="2xl"  ml="3">
                    {pageName}
                </Text>
                <Divider background={useColorModeValue("#000000","white")}/>


                <Spacer/>

                {/* Footer Section */}
                <Box>
                    <SideBarBox>
                        <Switch
                            size={"md"}
                            isChecked={colorMode === "dark"}
                            onChange={toggleColorMode}
                            colorScheme="gray"
                        />
                        <ButtonText>{colorMode === "dark" ? "Dark" : "Light"} Theme</ButtonText>
                    </SideBarBox>
                    <SideBarPageButton onClick={() =>navigate("/settings")}>
                        <LuSettings size="24px" />
                        <ButtonText>Settings</ButtonText>
                    </SideBarPageButton>
                </Box>
            </Box>
        </Box>
    );
}

function SideBarPageButton({ children, onClick }) {
    return (
        <Button
            w="100%"
            justifyContent="flex-start"
            bg="transparent"
            _hover={{ bg: "#EBECFF" }}
            _active={{ transform: "scale(0.95)", bg: "#EBECFF" }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

function SideBarBox({children}) {
    return (
        <Box w="100%" /* Full width */
             h={"40px"}
             paddingX={"16px"}
             display="flex"
             alignItems="center" /* Align content vertically */
             justifyContent="flex-start" /* Align content horizontally to the left */
             bg="transparent"
        >
            {children}
        </Box>
    )
}

function ButtonText({ children }) {
    return (
        <Text fontWeight="semibold" fontSize="lg"  ml="3">
            {children}
        </Text>
    );
}
