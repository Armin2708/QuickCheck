import { Stack, Box, Text, Button } from '@chakra-ui/react';
import { HiOutlineHome } from 'react-icons/hi';

export default function SideBar() {
    return (
        <Stack
            borderRadius="10px"
            justify="flex-start"
            align="flex-start"
            spacing="30px"
            width="100%" // Make the width flexible
            maxWidth="381px"
            background="#F9F9F9"
            boxShadow="4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        >
            {/* Main Section */}
            <Stack justify="flex-start" align="flex-start" width="100%">
                {/* Section for Icons and Title */}
                <Stack justify="flex-start" align="center" spacing="9px" width="100%">
                    <Box width="78px" height="75px" />
                    <Box height="1px" width="100%" background="#EDEDED" />
                </Stack>

                {/* Navigation Buttons */}
                <Stack paddingX="32px" justify="center" align="flex-start" spacing="32px" width="100%">
                    {/* Home Button with Icon */}
                    <Button
                        width="100%"
                        justifyContent="flex-start"
                        alignItems="center"
                        background="transparent" // Make button background transparent
                        _hover={{ background: 'none' }} // Prevent hover background change
                    >
                        <HiOutlineHome size="24px" />
                        <Text fontFamily="Inter" fontWeight="semibold" fontSize="28px" color="#313131" marginLeft="12px">
                            Home
                        </Text>
                    </Button>

                    {/* Classes, User, and Admin Sections */}
                    <TextOption label="Classes" />
                    <TextOption label="User" />
                    <TextOption label="Admin" />
                </Stack>
            </Stack>

            <Box height="1px" width="100%" background="#EDEDED" />

            {/* Settings and Sign-In Sections */}
            <Stack paddingX="32px" paddingY="39px" width="100%" spacing="22px">
                <TextOption label="Settings" />
                <TextOption label="Sign-in" />
            </Stack>
        </Stack>
    );
}

// Component for the text options to make the code more DRY
function TextOption({ label }) {
    return (
        <Stack direction="row" justify="flex-start" align="center" width="100%">
            <Text fontFamily="Inter" fontWeight="semibold" fontSize="28px" color="#313131">
                {label}
            </Text>
        </Stack>
    );
}
