import {Box, Wrap, WrapItem} from "@chakra-ui/react";
import OrganizationClassCard from "./OrganizationClassCard.jsx";

export default function OrganizationClassListComponent({organizationName,classes, onSuccess, isAdmin}){

    return(
        <Wrap justify={"center"}>
            <Box p="4">
                <Wrap justify={"center"} spacing={"30px"}>
                    {Array.isArray(classes) && classes.length > 0 ? (
                        classes.map((classObject) => (
                            <WrapItem key={classObject.id}>
                                <OrganizationClassCard {...classObject} onSuccess={onSuccess} isAdmin={isAdmin}/>
                            </WrapItem>
                        ))
                    ) : (
                        <WrapItem>No Classes in {organizationName}.</WrapItem>
                    )}
                </Wrap>
            </Box>
        </Wrap>
    )
}