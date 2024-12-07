import {Box, Image, Text, VStack, Wrap} from "@chakra-ui/react";
import {useAuth} from "../components/context/AuthContext.jsx";

export default function Dashboard() {

    const {fullUser} = useAuth()


    return (

        <Wrap justify={"center"} margin={"auto"}>
            <VStack>
                <Box maxWidth={"200px"} maxH={"200px"}>
                    <Image src={"../../public/QuickCheckTransparentGray.png"}/>
                </Box>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                    Welcome to Quick Check {fullUser?.name}!
                </Text>
            </VStack>
        </Wrap>

    );
}
