import {Box, useDisclosure, Text, } from "@chakra-ui/react";
import {useAuth} from "../components/context/AuthContext.jsx";


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
