import {useEffect, useState} from "react";
import {getOrganizationClassrooms, searchOrganizationClassrooms} from "../../../../services/client/classrooms.js";
import {Box, Wrap, WrapItem} from "@chakra-ui/react";
import SearchBar from "../../../shared/SearchBar.jsx";
import ClassroomListComponent from "./ClassroomListComponent.jsx";
import CreateClassroomButton from "./create/CreateClassroomButton.jsx";

export default function ClassroomComponent({name:organizationName, id:organizationId, isAdmin, fullUser}){

    const [classrooms, setClassrooms] = useState([])
    const [search, setSearch] = useState([])

    const fetchClassrooms = () =>{
        getOrganizationClassrooms(organizationId)
            .then((res) =>{
                setClassrooms(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    const fetchSearchClassrooms = (input) =>{
        searchOrganizationClassrooms(organizationId,input)
            .then((res) =>{
                setClassrooms(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    useEffect(() => {
        if (organizationId){
            fetchClassrooms()
        }
    }, [organizationId]);


    return(
        <Box>
            <SearchBar
                fetchSearch={fetchSearchClassrooms}
                fetchAll={fetchClassrooms}
                search={search}
                setSearch={setSearch}
            />
            {isAdmin() &&
                <Box paddingTop={"20px"}>
                    <CreateClassroomButton fullUser={fullUser} onSuccess={fetchClassrooms} organizationId={organizationId}/>
                </Box>
            }
            <ClassroomListComponent organizationName={organizationName} classrooms={classrooms} isAdmin={isAdmin} onSuccess={fetchClassrooms}/>
        </Box>
    )
}