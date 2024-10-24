import {Image, Stack, Text} from "@chakra-ui/react";
import React from "react";

export default function Footer(){
    return(
        <Stack
            paddingX={{ base: "20px", md: "50px", lg: "89px" }}  // Responsive padding
            paddingY="52px"
            justify="flex-start"
            align="flex-start"
            spacing="10px"
            width="100%"  // Full width to make it responsive
            background="#EDEDED"
        >
            <Stack
                direction="row"
                justify="space-between"
                align="center"
                width="100%"  // Full width for responsiveness
            >
                {/* Left Section: Logo and Text */}
                <Stack direction="row" justify="flex-start" align="center" spacing="10px">
                    <Image width="78px" height="75px" src={"././QuickCheckTransparent.png"} />
                    <Text
                        fontFamily="Inter"
                        fontWeight="bold"
                        fontSize="26px"
                        color="#313131"
                        textAlign="center"
                    >
                        Quick Check
                    </Text>
                </Stack>

                {/* Right Section: Links and Copyright */}
                <Stack
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="30px"
                    ml="auto"  // Push the right-side content to the right
                >
                    <Text
                        fontFamily="Inter"
                        fontWeight="semibold"
                        fontSize="20px"
                        color="#707070"
                        textAlign="center"
                    >
                        Docs
                    </Text>
                    <Text
                        fontFamily="Inter"
                        fontWeight="semibold"
                        fontSize="20px"
                        color="#707070"
                        textAlign="center"
                    >
                        Privacy
                    </Text>
                    <Text
                        fontFamily="Inter"
                        fontWeight="regular"
                        fontSize="18px"
                        color="#313131"
                        textAlign="center"
                        as="span"
                        fontSize="20px"
                        fontWeight="bold"
                    >
                        ©️ Quick Check

                    </Text>
                </Stack>
            </Stack>
        </Stack>
    )
}