import {Badge, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import DropDownMenu from "./DropDownMenu.jsx";

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
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}