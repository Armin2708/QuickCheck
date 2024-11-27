import {HStack, Td, Tr} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getUserById} from "../../../../services/client/users.js";
import DeleteOrganizationJoinCodeButton from "./DeleteOrganizationJoinCodeButton.jsx";
import UpdateOrganizationJoinCodeButton from "./UpdateOrganizationJoinCodeButton.jsx";


export default function OrganizationJoinCodeCard({id,code,usageLimit,creatorId}){

    const [creator, setCreator] = useState()

    const fetchCreator = () =>{
        getUserById(creatorId)
            .then((res) =>{
                setCreator(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    useEffect(() => {
        fetchCreator();
    }, [creatorId]);

    return(
        <Tr>
            <Td>{code}</Td>
            <Td>{usageLimit < 0 ? "Unlimited" : usageLimit}</Td>
            <Td>{creator?.email}</Td>
            <Td>
                <HStack>
                    <UpdateOrganizationJoinCodeButton id={id} usageLimit={usageLimit} onSuccess={fetchCreator}/>
                    <DeleteOrganizationJoinCodeButton id={id} onSuccess={fetchCreator}/>
                </HStack>
            </Td>
        </Tr>
    )
}