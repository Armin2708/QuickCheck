import { useState, useEffect } from 'react';
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Stack,
    Image, Button, useToast,
} from '@chakra-ui/react'
import {joinOrganization} from "../../services/client.js";
import {useAuth} from "../context/AuthContext.jsx";
import {errorNotification, successNotification} from "../../services/notification.js";

const IMAGE =
    'https://media.istockphoto.com/id/1349030917/photo/business-and-finance-looking-up-at-high-rise-office-buildings-in-the-financial-district-of-a.jpg?s=612x612&w=0&k=20&c=NSnN0va-f1OBG_GA7bTVmUIoBwNDKUXtHD8_PzeTNiA='

export default function BrowseOrganizationCard({ id, name, joinedOrg }) {
    const { fullUser } = useAuth();
    const toast = useToast();

    // State to control button status - null initially means "checking status"
    const [isJoined, setIsJoined] = useState(null);

    useEffect(() => {
        // Check if joinedOrg is loaded and is an array with values
        if (!Array.isArray(joinedOrg)) {
            return; // Exit early if joinedOrg is not yet loaded
        }

        // If joinedOrg is loaded, proceed to check if the user has joined this organization
        const joined = joinedOrg.some(org => org.id === id);
        setIsJoined(joined);
    }, [joinedOrg, id]);

    const handleJoinOrg = () => {
        joinOrganization(id, fullUser.id)
            .then(() => {
                successNotification("Organization Joined", `${name} was successfully added to your organizations`);
                toast({
                    title: 'Organization joined.',
                    description: `${name} has been joined successfully.`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setIsJoined(true);
            })
            .catch((err) => errorNotification(err.code, err.response?.data?.message))
    }

    return (
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${IMAGE})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={IMAGE}
                        alt="#"
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {name}
                    </Heading>
                    {isJoined !== null && (
                        <Button
                            isDisabled={isJoined}
                            onClick={handleJoinOrg}
                        >
                            {isJoined ? "Joined" : "Join"}
                        </Button>
                    )}
                </Stack>
            </Box>
        </Center>
    );
}
