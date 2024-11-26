import { Box,Wrap} from "@chakra-ui/react";
import { useAuth } from "../components/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import BrowseOrganizationListComponent
    from "../components/dashboard/browseOrganization/BrowseOrganizationListComponent.jsx";
import BrowseOrganizationJoinComponent
    from "../components/dashboard/browseOrganization/BrowseOrganizationJoinComponent.jsx";

export default function BrowseOrganizationPage() {

    const { fullUser,isAdmin } = useAuth();
    const navigate = useNavigate()

    return (
            <Wrap justify={"center"}>
                <Box p="4">
                    {isAdmin() ? (
                        <BrowseOrganizationListComponent fullUser={fullUser} navigate={navigate}/>
                    ) : (
                        <BrowseOrganizationJoinComponent fullUser={fullUser} navigate={navigate}/>
                    )}
                </Box>
            </Wrap>
    );
}
