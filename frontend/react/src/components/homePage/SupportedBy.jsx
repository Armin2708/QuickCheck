import {Box, Stack, Text, SimpleGrid, Image, Button} from "@chakra-ui/react";

export default function SupportedBy() {
    return (
            <Stack
                paddingY="70px"
                justify="center"
                align="center"
                spacing="10px"
                width="100%"
                background="#FFFFFF"
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
                    columns={{ base: 2, md: 4 }}  // 2 columns on mobile, 4 on larger screens
                    spacing="20px"                // Consistent spacing of 20px
                    width="100%"
                    maxWidth={{base: "320px", md:"660px"}}
                >
                    <SupportedBox src={"./csula.png"} />
                    <SupportedBox src={"./UCLA.png"} />
                    <SupportedBox src={"./UCB.png"} />
                    <SupportedBox src={"./usc.png"} />
                    <SupportedBox src={"./caltech.png"} />
                    <SupportedBox src={"./harvard.png"} />
                    <SupportedBox src={"./Stanford.png"} />
                    <DashedBox />
                </SimpleGrid>
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
            width="150px"
            height="150px"
        >
            <Box width={width} height={height}>
                <Image
                    src={src}
                    alt="Supported School Logo"
                    objectFit="contain" // Ensures the image fits inside the box while maintaining aspect ratio
                    width="100%"        // Makes the image fill the width of the box
                    height="100%"       // Makes the image fill the height of the box
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
            width="150px"
            height="150px"
            background="#EBECFF"
        >
            <Text
                fontFamily="Inter"
                fontWeight="semibold"
                fontSize="20px"
                color="#313131"
                textAlign="center"
            >
                ⭐️Your School
            </Text>
        </Button>
    );
}
