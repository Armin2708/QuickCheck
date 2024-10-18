import { Box, Button, Stack, Text, Image } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";

export default function Header() {
    return (
        <Stack
            paddingX="26px"
            paddingY="11px"
            justify="flex-start"
            align="flex-start"
            spacing="10px"
            width="100%"
            height="100px"
            background="#F9F9F9"
        >
            <Stack
                direction="row"
                justify="space-between"
                align="center"
                spacing="20px"
                width="100%"
            >
                {/* Left Section with Menu Icon and Quick Check Text */}
                <Stack direction="row" justify="flex-start" align="center" spacing="12px">
                    <Button
                        paddingX="14px"
                        paddingY="19px"
                        borderRadius="10px"
                        justify="center"
                        align="center"
                        width="55px"
                        height="55px"
                        background="#FFFFFF"
                    >
                        <IoMenu size={"200%"} />
                    </Button>

                    <Stack direction="row" align="center" spacing="10px">
                        <Box width="78px" height="auto">
                            <Image src={"././QuickCheckTransparent.png"} />
                        </Box>
                        <Text
                            fontFamily="Inter"
                            fontWeight="bold"
                            fontSize="26px"
                            color="#313131"
                            textAlign="left"  // Align text to the left
                        >
                            Quick Check
                        </Text>
                    </Stack>
                </Stack>

                {/* Right Section with Login Icon */}
                <Button
                    paddingX="11px"
                    paddingY="14px"
                    borderRadius="10px"
                    justify="center"
                    align="center"
                    width="55px"
                    height="55px"
                    background="#7E3BB5"
                >
                    <RiLoginBoxLine color={"white"} size={"200%"} />
                </Button>
            </Stack>
        </Stack>
    );
}
