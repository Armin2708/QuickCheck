import {Box, Stack, Text, SimpleGrid, Image, Button} from "@chakra-ui/react";

export default function SupportedBy() {
    return (
        <Stack
            paddingX={{ base: "20px", md: "50px", lg: "100px" }}  // Reduced padding for better responsiveness
            paddingY="70px"
            justify="flex-start"
            align="center"
            spacing="10px"
            width="100%"
            background="#FFFFFF"
        >
            <Stack
                justify="flex-start"
                align="center"
                spacing="27px"
                width="100%"
                maxWidth="683px"
            >
                <Text
                    fontFamily="Inter"
                    fontWeight="medium"
                    fontSize="18px"
                    color="#632E8E"
                    textAlign="center"
                >
                    SUPPORTED AND TRUSTED BY
                </Text>

                {/* Responsive Grid for Boxes */}
                <SimpleGrid
                    minChildWidth="145px"  // Ensures a minimum width per box to prevent stacking
                    spacing="15px"
                    width="100%"
                    maxWidth="100%"
                >
                    {/* Boxes displayed in grid */}
                    <SupportedBox width="120px" height="120px" src={"./csula.png"}/>
                    <SupportedBox width="120px" height="120px" src={"./UCLA.png"}/>
                    <SupportedBox width="120px" height="120px" src={"./UCB.png"}/>
                    <SupportedBox width="120px" height="120px" src={"./usc.png"}/>
                    <SupportedBox width="120px" height="120px" src={"./caltech.png"}/>
                    <SupportedBox width="120px" height="120px" src={"./harvard.png"}/>
                    <SupportedBox width="120px" height="120px" src={"./Stanford.png"}/>
                    <DashedBox />
                </SimpleGrid>
            </Stack>
        </Stack>
    );
}

function SupportedBox({ width, height, src }) {
    return (
        <Stack
            paddingX="10px"
            paddingY="10px"
            borderRadius="10px"
            justify="center"
            align="center"
            background="#F9F9F9"
            width="160px"
            height="130px"
        >
            <Box width={width} height={height} >
                <Image
                    src={src}
                    alt="Supported School Logo"
                    objectFit="contain"  // Ensures the image fits inside the box while maintaining aspect ratio
                    width="100%"         // Makes the image fill the width of the box
                    height="100%"        // Makes the image fill the height of the box
                />
            </Box>
        </Stack>
    );
}

function DashedBox() {
    return (
        <Button
            paddingX="10px"
            paddingY="40px"
            borderRadius="10px"
            justify="center"
            align="center"
            borderWidth="1px"
            borderColor="#7E3BB5"
            borderStyle="dashed"
            width="164px"
            height="132px"
            background="#EBECFF"
        >
            <Text
                fontFamily="Inter"
                fontWeight="semibold"
                fontSize="22px"
                color="#313131"
                textAlign="center"
            >
                ⭐️Your School
            </Text>
        </Button>
    );
}
