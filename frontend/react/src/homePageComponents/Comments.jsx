import { Box, Stack, Text, Image } from "@chakra-ui/react";

export default function Comments() {
    return (
        <Stack
            paddingX={{ base: "20px", md: "50px", lg: "65px" }}  // Responsive padding
            paddingY={{ base: "50px", md: "100px", lg: "134px" }}  // Responsive padding
            justify="flex-start"
            align="center"
            spacing="10px"
            width="100%"
            maxWidth="100%"
            background="#FFFFFF"
        >
            <Stack
                justify="flex-start"
                align="center"
                spacing="56px"
                width="100%"
                maxWidth="1382px"
            >
                <Text
                    fontFamily="Inter"
                    fontWeight="bold"
                    fontSize={{ base: "36px", md: "50px", lg: "65px" }}  // Responsive font size
                    color="#313131"
                    textAlign="center"
                >
                    Loved by the community
                </Text>

                {/* Comments Section */}
                <Stack
                    direction={{ base: "column", md: "row" }}  // Stack vertically on small screens
                    justify="center"
                    align="center"
                    spacing="38px"
                    width="100%"
                >
                    {/* First Comment Card */}
                    <CommentCard
                        text="I love using Quick Check, It really makes my time valuable. I can verify my crew mates' presence without using my Haki!"
                        name="Gol D. Roger"
                        title="King of the pirates"
                        src={"./Goldroger.png"}
                    />

                    {/* Second Comment Card */}
                    <CommentCard
                        text="Quick Check changed my team management, I am able to focus on my work and not worry about people's presence."
                        name="John P. Goliter"
                        title="French fashion designer"
                        src={"./JohnPGoliter.png"}
                    />

                    {/* Third Comment Card */}
                    <CommentCard
                        text="My disciples created a Quick Check space, since then I can’t separate from it. It's just such a great tool 😤."
                        name="Adonis Chad"
                        title="Giga Chad"
                        src={"./AdonisChad.png"}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}

function CommentCard({ text, name, title,src }) {
    return (
        <Stack
            paddingX="33px"
            paddingY="36px"
            borderRadius="15px"
            justify="flex-start"
            align="flex-start"
            spacing="10px"
            width="100%"
            maxWidth="428px"
            background="#FBFBFB"
            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
            _hover={{
                transform: "scale(1.05)",  // Slightly enlarge the card
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",  // Add a deeper shadow on hover
                background: "#F5F5F5",  // Subtle background change
                transition: "all 0.3s ease-in-out",  // Smooth transition effect
            }}
            transition="all 0.3s ease-in-out"
        >
            <Text
                fontFamily="Inter"
                lineHeight="1.5"
                fontWeight="medium"
                fontSize="18px"
                color="#313131"
            >
                {text}
            </Text>
            <Stack
                direction="row"
                justify="flex-start"
                align="center"  // Ensure image and text are aligned vertically
                spacing="15px"  // Add some space between image and text
                width="100%"
            >
                <Image
                    borderRadius="full"
                    width="66px"
                    height="66px"
                    backgroundColor="#EEE"
                    src={src}
                    alt={name}
                />
                <Stack spacing="0px">
                    <Text
                        fontFamily="Inter"
                        fontWeight="semibold"
                        fontSize="24px"
                        color="#7E3BB5"
                    >
                        {name}
                    </Text>
                    <Text
                        fontFamily="Inter"
                        fontSize="14px"
                        color="#313131"
                    >
                        {title}
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    );
}
