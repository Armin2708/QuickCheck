import {Divider, Stack, Text} from "@chakra-ui/react";
import NotificationCard from "./NotificationCard.jsx";

export default function NotificationComponent({}){
    return(
        <Stack
            alignItems="center" // Horizontally center the content
            justifyContent="center" // Vertically center the content
            spacing="20px" // Adjust spacing between items
            paddingX={"10px"}
        >
            <Text fontWeight="semibold" fontSize="30px">
                Notifications
            </Text>
            <Divider colorScheme="gray" width="80%" />
            <NotificationCard />
            <NotificationCard />
        </Stack>
    )
}