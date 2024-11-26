import {getOrganizationByName, leaveOrganization} from "../../../../services/client.js";
import {errorNotification, successNotification} from "../../../../services/notification.js";
import {LuTrash2} from "react-icons/lu";
import {Button} from "@chakra-ui/react";

export default function LeaveOrganizationButton({onSuccess, id, name, fullUser}){

    const handleLeaveOrg = () =>{
        leaveOrganization(fullUser.id,id)
            .then(() => {
                successNotification(
                    "Class Left",
                    `${name} was successfully Left`
                );
                onSuccess()
            })
            .catch((err) => {
                errorNotification(
                    err.code,
                    err.response?.data?.message
                )
            })
    }
    return(
        <Button
            paddingX={"16px"} paddingY={"8px"} borderRadius={"full"}
            backgroundColor={"#7E3BB5"}
            color={"white"}
            onClick={(e) => {
                e.stopPropagation(); // Prevent click from propagating to the outer Box
                handleLeaveOrg();
            }}
        >
           Leave Organization<LuTrash2 />
        </Button>
    )
}