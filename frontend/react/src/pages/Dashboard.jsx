import DashboardWrap from "../components/shared/dashboard/DashboardWrap.jsx";
import NotificationComponent from "../components/dashboard/notifications/NotificationComponent.jsx";
import {Box} from "@chakra-ui/react";

export default function Dashboard() {

    return (
        <DashboardWrap>
            <Box flex="1" display="flex" justifyContent="center">
                <NotificationComponent />
            </Box>
        </DashboardWrap>

    );
}
