import {Box, Wrap, WrapItem} from "@chakra-ui/react";
import ClassroomCard from "./ClassroomCard.jsx";
import CreateClassroomButton from "./create/CreateClassroomButton.jsx";

export default function ClassroomListComponent({classrooms, organizationName, isAdmin, onSuccess}){


    return(

        <Wrap justify={"center"}>
            <Box p="4">
                <Wrap justify={"center"} spacing={"30px"}>
                    {Array.isArray(classrooms) && classrooms.length > 0 ? (
                        classrooms.map((classroom) => (
                            <WrapItem key={classroom.id}>
                                <ClassroomCard {...classroom} isAdmin={isAdmin} onSuccess={onSuccess}/>
                            </WrapItem>
                        ))
                    ) : (
                        <WrapItem>No Classrooms in {organizationName}.</WrapItem>
                    )}
                </Wrap>
            </Box>
        </Wrap>
    )
}