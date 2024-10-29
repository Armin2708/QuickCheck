import {
    Box,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    chakra,
    useColorModeValue, Button,
} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FaArrowLeft} from "react-icons/fa";
import {getClassById, getClassroomById, getUserById, getUsersInClass} from "../services/client.js";

function StatsCard({ title, stat }) {
    return (
        <Stat
            px={{ base: 4, md: 8 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <StatLabel fontWeight={'medium'} isTruncated>
                {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                {stat}
            </StatNumber>
        </Stat>
    );
}

export default function ClassPage() {

    const [classroom, setClassroom] = useState({});
    const [classObject, setClassObject] = useState({});
    const [professor, setProfessor] = useState({});
    const [usersInClass,setUsersInClass] = useState([]);

    const { name: orgName, id: classId } = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const classResponse = await getClassById(classId);
            if (classResponse.data) {
                setClassObject(classResponse.data);

                // Directly use classResponse.data instead of relying on the classObject state
                const professorResponse = await getUserById(classResponse.data.professorId);
                if (professorResponse.data) {
                    setProfessor(professorResponse.data);
                } else {
                    console.error('Expected an object for professor but got:', professorResponse.data);
                }

                const classroomResponse = await getClassroomById(classResponse.data.classroomId);
                if (classroomResponse.data) {
                    setClassroom(classroomResponse.data);
                } else {
                    console.error('Expected an object for classroom but got:', classroomResponse.data);
                }

            } else {
                console.error('Expected an object for class but got:', classResponse.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        const userInClass = await getUsersInClass(classId);
        if (userInClass.data) {
            setUsersInClass(userInClass.data);
        } else {
            console.error('Expected an object for users in clas but got:', userInClass.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, [classId]);

    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <Button leftIcon={<FaArrowLeft />} onClick={() => navigate(`/organization/${orgName}`)}>
                Back
            </Button>
            <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
                {classObject?.name}
            </chakra.h1>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard title={'Students'} stat={usersInClass?.length || 0} />
                <StatsCard title={'Professor Contact'} stat={professor?.email || "N/A"} />
                <StatsCard title={'Location'} stat={classroom?.roomName || "N/A"} />
            </SimpleGrid>
        </Box>
    );
}
