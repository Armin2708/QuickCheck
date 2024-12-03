import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image, Button, useToast
} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {errorNotification, successNotification} from "../../../services/notification.js";
import {getUserById} from "../../../services/client/users.js";
import {getClassroomById} from "../../../services/client/classrooms.js";
import {getClassProfilePictureUrl, joinClass} from "../../../services/client/classes.js";

export default function BrowseClassCard({id: classId,professorId,name,classroomId, joinedClass,userId}) {

    const [professor, setProfessor] = useState({});
    const [classroom, setClassroom] = useState({});

    const [isJoined, setIsJoined] = useState(null);
    const {fullUser} = useAuth();

    const defaultImage = "https://media.istockphoto.com/id/589985098/photo/los-angeles-skyline-by-night-california-usa.jpg?s=612x612&w=0&k=20&c=o8akFWVTSi6B9l3RbpwvAXlkaisy1aZy70qwi8Yj3Hw="

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
                setClassroom(res.data); // Set the admins state
            })
            .catch(error => {
                console.error('Error fetching classroom:', error); // Log any errors
            });
    };

    const handleJoinClass = () => {
        if (!fullUser || !fullUser.id) {
            console.error("User not loaded");
            return;
        }

        joinClass(classId, fullUser.id)
            .then(() => {
                successNotification(
                    "Class Joined",
                    `${name} was successfully added to your organizations`
                );
                setIsJoined(true);
            })
            .catch((err) => {
                errorNotification(
                    err.code,
                    err.response?.data?.message || "Error joining class"
                );
            });
    };

    useEffect(() => {
        if (professorId) {
            fetchProfessor();
        }

        if (classroomId) {
            fetchClassroom();
        }

        if (Array.isArray(joinedClass) && classId) {
            const joined = joinedClass.some(org => org.id === classId);
            setIsJoined(joined);
        }
    }, [joinedClass, classId, classroomId, professorId]);


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
                        backgroundImage: `url(${getClassProfilePictureUrl(classId)})`,
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
                        src={getClassProfilePictureUrl(classId)}
                        fallbackSrc={defaultImage}
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
                    {isJoined !== null && (
                        <Button
                            isDisabled={isJoined || (userId===professorId)}
                            onClick={handleJoinClass}
                        >
                            {userId===professorId?"Instructor" : (isJoined ? "Joined" : "Join")}
                        </Button>
                    )}
                </Stack>
            </Box>
        </Center>
    )
}