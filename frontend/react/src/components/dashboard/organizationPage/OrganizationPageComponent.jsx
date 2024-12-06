import {Box, HStack, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import OrganizationJoinCodeComponent from "./joinCode/OrganizationJoinCodeComponent.jsx";
import OrganizationUsersComponent from "./organizationUsers/OrganizationUsersComponent.jsx";
import OrganizationClassesComponent from "./organizationClasses/OrganizationClassesComponent.jsx";
import DeleteOrganizationButton from "./organization/DeleteOrganizationButton.jsx";
import UpdateOrganizationButton from "./organization/UpdateOrganizationButton.jsx";
import LeaveOrganizationButton from "./organization/LeaveOrganizationButton.jsx";

import ClassroomComponent from "./organizationClassrooms/ClassroomComponent.jsx";
import EventsComponent from "./events/EventsComponent.jsx";

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
                    <Tab>Classrooms</Tab>
                    {isAdmin() &&
                        <>
                            <Tab>Classes</Tab>
                            <Tab>Users</Tab>
                            <Tab>Code</Tab>
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
                    <EventsComponent organizationId={organization?.id} isAdmin={isAdmin} fullUser={fullUser}/>
                </TabPanel>
                <TabPanel>
                    <ClassroomComponent {...organization} isAdmin={isAdmin} fullUser={fullUser}/>
                </TabPanel>
                <TabPanel>
                    <OrganizationClassesComponent {...organization} isAdmin={isAdmin} fullUser={fullUser}/>
                </TabPanel>
                <TabPanel>
                    <OrganizationUsersComponent {...organization}/>
                </TabPanel>
                <TabPanel>
                    <OrganizationJoinCodeComponent organization={organization} fullUser={fullUser}/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );

}
