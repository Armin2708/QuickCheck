import {Stack,HStack} from "@chakra-ui/react";
import SideBar from "../shared/SideBar.jsx";
import Header from "../shared/headerFooter/Header.jsx";

export default function DashboardWrap({children}) {

    return (
        <Stack spacing={"0px"}>
            <Header />
            <SideBar />
            <HStack alignItems="flex-start" spacing={"0px"}>
                {children}
            </HStack>
        </Stack>

    );
}
