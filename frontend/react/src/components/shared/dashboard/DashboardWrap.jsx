import {Stack,HStack} from "@chakra-ui/react";
import SideBar from "../SideBar.jsx";
import Header from "../headerFooter/Header.jsx";
import OrganizationListComponent from "../../dashboard/organizationList/OrganizationListComponent.jsx";

export default function DashboardWrap({children}) {

    return (
        <Stack spacing={"0px"}>
            <Header />
            <SideBar />
            <HStack alignItems="flex-start" spacing={"0px"}>
                <OrganizationListComponent />
                {children}
            </HStack>
        </Stack>

    );
}
