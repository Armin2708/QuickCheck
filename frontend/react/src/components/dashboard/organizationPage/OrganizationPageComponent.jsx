import {Box, HStack, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import OrganizationJoinCodeComponent from "./joinCode/OrganizationJoinCodeComponent.jsx";
import OrganizationUsersComponent from "./organizationUsers/OrganizationUsersComponent.jsx";
import OrganizationClassesComponent from "./organizationClasses/OrganizationClassesComponent.jsx";
import DeleteOrganizationButton from "./organization/DeleteOrganizationButton.jsx";
import UpdateOrganizationButton from "./organization/UpdateOrganizationButton.jsx";
import LeaveOrganizationButton from "./organization/LeaveOrganizationButton.jsx";
import Events from "./events/Events.jsx";

export default function OrganizationPageComponent({isAdmin,organization,fullUser}) {

    const weeklyTasks = {
        Monday: ["Team meeting at 10 AM", "Project deadline at 3 PM"],
        Tuesday: ["Doctor's appointment at 2 PM", "Gym session at 5 PM"],
        Wednesday: ["Work on report", "Dinner with friends"],
        Thursday: ["Client presentation at 1 PM"],
        Friday: ["Submit weekly update", "Watch a movie"],
        Saturday: ["Family picnic", "Grocery shopping"],
        Sunday: ["Relax and plan next week"],
    };

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
                    <Box display="flex" flexDirection="row" gap="16px" flex={1}>
                        <Events tasks={weeklyTasks} {...organization} />
                    </Box>
                </TabPanel>
                <TabPanel>
                    <OrganizationJoinCodeComponent organization={organization} fullUser={fullUser}/>
                </TabPanel>
                <TabPanel>
                    <OrganizationUsersComponent/>
                </TabPanel>
                <TabPanel>
                    <OrganizationClassesComponent/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );

}
