import {Box, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import OrganizationJoinCodeCard from "./OrganizationJoinCodeCard.jsx";
import React, {useEffect, useState} from "react";
import CreateOrganizationJoinCodeButton from "./CreateOrganizationJoinCodeButton.jsx";
import { getOrganizationJoinCodes} from "../../../../services/client.js";

export default function OrganizationJoinCodeComponent({organization, fullUser}){

    const [joinCodes, setJoinCodes] = useState([])

    const fetchJoinCodes = () =>{
        getOrganizationJoinCodes(organization?.id)
            .then((res) =>{
                setJoinCodes(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    useEffect(() => {
        fetchJoinCodes()
    }, [organization]);


    return(
        <Box>
            <CreateOrganizationJoinCodeButton {...organization} fullUser={fullUser} onSuccess={fetchJoinCodes}/>
            <TableContainer>
                <Table variant='striped' colorScheme='green'>
                    <TableCaption>Organization Invitation Code List</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Code</Th>
                            <Th>Usage Limit</Th>
                            <Th>Creator Email</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Array.isArray(joinCodes) && joinCodes.length > 0 ? (
                            joinCodes.map((joinCode) => (
                                <OrganizationJoinCodeCard key={joinCode.id} {...joinCode}/>
                            ))) : null}
                    </Tbody>
                    <Tfoot>
                        {/*Pagination*/}
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}