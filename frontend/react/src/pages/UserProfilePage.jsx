
import {useEffect, useState} from "react";
import {useAuth} from "../components/context/AuthContext.jsx";

import UserProfileCard from "../components/userProfile/UserProfileCard.jsx";
import HeadSection from "../components/HeadSection.jsx";

import PageWrap from "../components/PageWrap.jsx";
import {getUserById} from "../services/client/users.js";

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
                    {...user} onSuccess={fetchUser}
                />

        </PageWrap>
    )
}