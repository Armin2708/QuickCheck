import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue, VStack, Spinner,
} from '@chakra-ui/react'
import HeaderFooter from "../components/shared/HeaderFooter.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "../components/context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import UpdateUserProfileButton from "../components/userProfile/UpdateUserProfileButton.jsx";
import {getUserById} from "../services/client.js";
import UserProfileCard from "../components/userProfile/UserProfileCard.jsx";

export default function UserProfilePage(){

    const {fullUser} = useAuth();
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false)

    const [user,setUser]=useState();

    const fetchUser = () =>{
        setIsLoading(true);
        getUserById(fullUser?.id)
            .then(res => {
                setUser(res.data)
            })
            .catch(error => {
                console.error('Error fetching user details:', error); // Log any errors
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (!fullUser || !fullUser.id){
            return
        }
        fetchUser();
    }, [fullUser]);

    return(
        <HeaderFooter>
            <VStack>
                <Button
                    fontSize={'sm'}
                    _focus={{
                        bg: 'gray.200',
                    }}
                    onClick={() => {
                        navigate("/dashboard")
                    }}
                >
                    Return
                </Button>
                {isLoading ? <Spinner/> :
                    <UserProfileCard
                        {...user} onSuccess={fetchUser} returnButton={true} userProfile={true}
                    />
                }
            </VStack>
        </HeaderFooter>
    )
}