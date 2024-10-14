import {Badge, Tab, TabList, TabPanel, TabPanels, Tabs, Tr} from "@chakra-ui/react";
import DropDownMenu from "./DropDownMenu.jsx";
import WhatIsQuicCheck from "./WhatIsQuicCheck.jsx";
import TryQuickCheck from "./TryQuickCheck.jsx";
import GetQuickCheck from "./GetQuickCheck.jsx";

export default function DescriptionTab(){
    return(
        <Tabs variant='soft-rounded' colorScheme='green' align={"center"}>
            <TabList>
                <Tab>
                    What is QuickCheck
                </Tab>
                <Tab>
                    Try QuickCheck
                </Tab>
                <Tab>
                    Get QuickCheck
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <WhatIsQuicCheck/>
                </TabPanel>
                <TabPanel>
                    <TryQuickCheck/>
                </TabPanel>
                <TabPanel>
                    <GetQuickCheck/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}