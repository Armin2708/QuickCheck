import {Box, Center, HStack, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import MiniMap from "./map/MiniMap.jsx";
import UpdateClassroomButton from "./update/UpdateClassroomButton.jsx";
import DeleteClassroomButton from "./delete/DeleteClassroomButton.jsx";
import MapLink from "./map/MapLink.jsx";

export default function ClassroomCard({location,capacity, name, id, isAdmin, onSuccess}){

    const [latitude, longitude] = location.split(",").map(coord => parseFloat(coord.trim()));

    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY; // Replace with your API key

    const classroom = {
        id: id,
        name: name,
        location: location,
        capacity: capacity
    }

    return(
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                w={'330px'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <MiniMap latitude={latitude} longitude={longitude} apiKey={apiKey}/>
                <Stack pt={10} align={'center'}>

                    <Text fontWeight={800} fontSize={'xl'}>
                        {name}
                    </Text>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        Capacity : {capacity}
                    </Text>
                    <MapLink latitude={latitude} longitude={longitude} apiKey={apiKey}/>

                    {isAdmin() && (
                        <HStack>
                            <UpdateClassroomButton onSuccess={onSuccess} classroom={classroom}/>
                            <DeleteClassroomButton onSuccess={onSuccess} classroom={classroom}/>
                        </HStack>
                    )}
                </Stack>
            </Box>
        </Center>
    )
}