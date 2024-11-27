import {getOrganizationByName, leaveOrganization} from "../../../../services/client/organizations.js";
import {errorNotification, successNotification} from "../../../../services/notification.js";
import {LuTrash2} from "react-icons/lu";
import {Button} from "@chakra-ui/react";

export default function LeaveClassButton({onSuccess, name, fullUser}){

    const handleLeaveOrg = () =>{
        getOrganizationByName(name)
            .then((res) =>{
                leaveOrganization(fullUser.id,res.data?.id)
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
            })
            .catch(err =>{
                console.log(err)
            })

    }
    return(
        <Button
            borderRadius={"full"}
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