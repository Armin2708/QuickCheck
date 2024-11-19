import {
    Spinner,
} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {useAuth} from "../components/context/AuthContext.jsx";

import {getUserById} from "../services/client.js";
import UserProfileCard from "../components/userProfile/UserProfileCard.jsx";
import HeadSection from "../components/HeadSection.jsx";

import PageWrap from "../components/PageWrap.jsx";

export default function UserProfilePage(){

    const {fullUser} = useAuth();
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
        <PageWrap pageName={"Profile"}>
            <HeadSection/>

            <UserProfileCard
                    {...user} onSuccess={fetchUser} userProfile={true}
                />

        </PageWrap>
    )
}