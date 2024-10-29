'use client'

import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image, Button,
} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import UpdateClassButton from "./UpdateClassButton.jsx";
import {getUserById} from "../../services/client.js";
import DeleteClassButton from "./DeleteClassButton.jsx";

const IMAGE =
    'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/18725/images/DAau3fjETFmAjLVaNl3B_FallLandscape7-.jpg'

export default function ClassCardAdmin({professorId,name,startDate,endDate,id,fetchClasses}) {

    const [professor, setProfessor] = useState();

    const fetchProfessor = () => {
        getUserById(professorId)
            .then(res => {
                if (res.data) {
                    setProfessor(res.data); // Set the admins state
                } else {
                    console.error('Expected an object but got:', res.data);
                }
            })
            .catch(error => {
                console.error('Error fetching professor:', error); // Log any errors
            });
    };

    useEffect(() => {
        fetchProfessor();
    }, []);

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
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {professor?.name}
                    </Text>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {name}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                            Location
                        </Text>
                    </Stack>
                    <Button>
                        Open Class
                    </Button>
                    <Stack direction={'row'} align={'center'}>
                        <UpdateClassButton
                            professorId={professorId}
                            id={id}
                            name={name}
                            startDate={startDate}
                            endDate={endDate}
                            onSuccess={fetchClasses}
                        />
                        <DeleteClassButton classId={id} className={name} onSuccess={fetchClasses}/>
                    </Stack>

                </Stack>
            </Box>
        </Center>
    )
}