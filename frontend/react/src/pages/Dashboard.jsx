import DashboardWrap from "../components/dashboard/DashboardWrap.jsx";
import NotificationComponent from "../components/dashboard/notifications/NotificationComponent.jsx";
import {Box} from "@chakra-ui/react";
import OrganizationListComponent from "../components/dashboard/organizationList/OrganizationListComponent.jsx";
import {useAuth} from "../components/context/AuthContext.jsx";

export default function Dashboard() {
    const { fullUser } = useAuth();

    return (
        <DashboardWrap>
            <OrganizationListComponent fullUser={fullUser} />
            <Box flex="1" display="flex" justifyContent="center">
                <NotificationComponent />
            </Box>
        </DashboardWrap>

    );
}
