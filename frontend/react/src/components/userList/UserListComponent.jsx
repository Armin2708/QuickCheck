import {Box, Text, Wrap, WrapItem} from "@chakra-ui/react";
import UserProfileCard from "../userProfile/UserProfileCard.jsx";

export default function UserListComponent({users, fetchUsers}){

    return(
        <Wrap justify="center" spacing="20px">
            {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                    <WrapItem key={user?.id}>
                        <UserProfileCard
                            {...user}
                            onSuccess={fetchUsers}
                            userProfile={false}
                        />
                    </WrapItem>
                ))
            ) : (
                <Text> No Users </Text>
            )}
        </Wrap>
    )
}