import {Box, Image, Stack,Text} from "@chakra-ui/react";

export default function NotificationCard({}){
    return(
        <Stack direction={"row"} backgroundColor={"#E5E5E5"} borderRadius={"18px"} alignItems={"center"} spacing={"15px"} padding={"10px"}>
            <Image
                src={'https://media.istockphoto.com/id/1349030917/photo/business-and-finance-looking-up-at-high-rise-office-buildings-in-the-financial-district-of-a.jpg?s=612x612&w=0&k=20&c=NSnN0va-f1OBG_GA7bTVmUIoBwNDKUXtHD8_PzeTNiA='}
                width={"50px"}
                height={"50px"}
                borderRadius={"10px"}
            />
            <Stack direction={"column"} spacing={"0px"}>
                <Text fontSize={"15px"} fontWeight={"bold"}>
                    Welcome to Quick Check
                </Text>
                <Text fontSize={"15"} maxWidth={"300px"}>
                    This feature is still in development but feel free to give feedback !
                </Text>
            </Stack>
        </Stack>
    )
}