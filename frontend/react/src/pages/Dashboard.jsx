import DashboardWrap from "../components/dashboard/DashboardWrap.jsx";
import NotificationComponent from "../components/dashboard/notifications/NotificationComponent.jsx";
import {Box, useDisclosure, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";
import OrganizationListComponent from "../components/dashboard/organizationList/OrganizationListComponent.jsx";
import {useAuth} from "../components/context/AuthContext.jsx";
import SideBar from "../components/dashboard/SideBar.jsx";

export default function Dashboard() {
    const { fullUser } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()

    {/*<OrganizationListComponent fullUser={fullUser} />
            <Box flex="1" display="flex" justifyContent="center">
                <NotificationComponent />
            </Box>*/}

    return (

                <Text>
                    Hello
                </Text>

    );
}
