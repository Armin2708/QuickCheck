import {Text, Wrap, WrapItem} from "@chakra-ui/react";
import OrganizationUserCard from "./OrganizationUserCard.jsx";

export default function OrganizationUserListComponent({users, fetchUsers, organizationId,organizationName}){

    return(
        <Wrap justify="center" spacing="20px">
            {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                    <WrapItem key={user?.id}>
                        <OrganizationUserCard
                            {...user}
                            onSuccess={fetchUsers}
                            organizationId={organizationId}
                            organizationName={organizationName}
                            key={user.id}
                        />
                    </WrapItem>
                ))
            ) : (
                <Text> No Users </Text>
            )}
        </Wrap>
    )
}