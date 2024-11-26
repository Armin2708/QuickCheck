import {Button} from "@chakra-ui/react";

export default function UpdateOrganizationButton({name}){

    return(
        <Button paddingX={"16px"} paddingY={"8px"} borderRadius={"full"} bg={"#C6D6F5"}>
            Update {name}
        </Button>
    )
}