import {Box, HStack, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import OrganizationJoinCodeComponent from "./joinCode/OrganizationJoinCodeComponent.jsx";
import OrganizationUsersComponent from "./organizationUsers/OrganizationUsersComponent.jsx";
import OrganizationClassesComponent from "./organizationClasses/OrganizationClassesComponent.jsx";
import DeleteOrganizationButton from "./organization/DeleteOrganizationButton.jsx";
import UpdateOrganizationButton from "./organization/UpdateOrganizationButton.jsx";
import LeaveOrganizationButton from "./organization/LeaveOrganizationButton.jsx";
import Events from "./events/Events.jsx";
import EventsPage from "./events/EventsPage.jsx";

export default function OrganizationPageComponent({isAdmin,organization,fullUser}) {

    return (
        <Tabs
            variant="soft-rounded"
            colorScheme="green"
            width="100%"
            flex={1}
        >
            <HStack width="100%" padding="16px" >
                <TabList>
                    <Tab>Events</Tab>
                    {isAdmin() &&
                        <>
                            <Tab>Code</Tab>
                            <Tab>Users</Tab>
                            <Tab>Classes</Tab>
                        </>
                    }
                </TabList>
                <Spacer/>
                {(isAdmin()) ? (
                    <>
                        <UpdateOrganizationButton {...organization} />
                        <DeleteOrganizationButton {...organization} />
                    </>
                ):null}
                <LeaveOrganizationButton
                    onSuccess={() =>{
                        navigate("/dashboard")
                    }}
                    {...organization}
                    fullUser={fullUser}
                />
            </HStack>

            <TabPanels flex={1}>
                <TabPanel>
                    <EventsPage/>
                </TabPanel>
                <TabPanel>
                    <OrganizationJoinCodeComponent organization={organization} fullUser={fullUser}/>
                </TabPanel>
                <TabPanel>
                    <OrganizationUsersComponent {...organization}/>
                </TabPanel>
                <TabPanel>
                    <OrganizationClassesComponent {...organization}/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );

}
