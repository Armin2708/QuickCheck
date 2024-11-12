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
    useColorModeValue, VStack,
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

    const [user,setUser]=useState(fullUser);
    const userId = fullUser.id

    const fetchUser = () =>{
        if (!userId) return;
        getUserById(userId)
            .then(res => {
                if (res.data) {
                    setUser(res.data); // Set the admins state
                } else {
                    console.error('Expected an object but got:', res.data);
                }
            })
            .catch(error => {
                console.error('Error fetching professor:', error); // Log any errors
            });
    }

    useEffect(() => {
        fetchUser();
    }, []);

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
                <UserProfileCard
                    {...user} onSuccess={fetchUser} returnButton={true} userProfile={true}
                />
            </VStack>
        </HeaderFooter>
    )
}