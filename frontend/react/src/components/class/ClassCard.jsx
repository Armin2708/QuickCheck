'use client'

import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button, useToast
} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {getClassroomById, getClassrooms, getUserById, leaveClass} from "../../services/client.js";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import {errorNotification, successNotification} from "../../services/notification.js";


const IMAGE =
    'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/18725/images/DAau3fjETFmAjLVaNl3B_FallLandscape7-.jpg'

export default function ClassCard({id,professorId,name,classroomId,onSuccess, fullUser}) {

    const [professor, setProfessor] = useState();
    const [classroom, setClassroom] = useState();

    const navigate = useNavigate();

    const {name : orgName} = useParams();

    const toast = useToast();

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

    const fetchClassroom = () =>{
        getClassroomById(classroomId)
            .then(res => {
                if (res.data) {
                    setClassroom(res.data); // Set the admins state
                } else {
                    console.error('Expected an object but got:', res.data);
                }
            })
            .catch(error => {
                console.error('Error fetching classroom:', error); // Log any errors
            });
    };

    const handleLeaveClass = () => {
        leaveClass(id, fullUser.id)
            .then(() => {
                console.log("Successfully left class");
                onSuccess(); // Ensure this is being called
                successNotification(
                    "Class Left",
                    `${name} was successfully left`
                );
            })
            .catch((err) => {
                console.error("Error leaving class:", err);
                errorNotification(
                    err.code,
                    err.response?.data?.message
                );
            });
    };

    useEffect(() => {
        fetchProfessor();
        fetchClassroom();
    }, [professorId,classroomId]);

    return (
        <Center py={12}>
            <Box
                width={"100%"}
                height={"100%"}
                background={"transparent"}
                _hover={{
                    transform: "scale(1.05)", // Scale up slightly on hover
                    transition: "transform 0.2s ease-in-out" // Smooth transition effect
                }}
                _active={{
                    transform: "scale(1)" // Return to original size when clicked
                }}
            >
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
                                {classroom?.roomName}
                            </Text>
                        </Stack>
                        <Stack direction={'row'} align={'center'}>
                            <Button
                                fontWeight={800}
                                fontSize={'xl'}
                                onClick={()=>navigate(`/organization/${orgName}/class/${id}`)}
                            >
                                Open
                            </Button>
                            <Button
                                fontWeight={800}
                                fontSize={'xl'}
                                onClick={()=>handleLeaveClass()}
                            >
                                Leave
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Center>
    )
}