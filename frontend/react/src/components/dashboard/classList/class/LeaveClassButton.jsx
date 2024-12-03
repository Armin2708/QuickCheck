import {successNotification} from "../../../../services/notification.js";
import {LuTrash2} from "react-icons/lu";
import {Button} from "@chakra-ui/react";
import {leaveClass} from "../../../../services/client/classes.js";
import {useNavigate} from "react-router-dom";

export default function LeaveClassButton({classId, fullUser, orgName}){

    const navigate = useNavigate()

    const handleLeaveClass = () =>{
        leaveClass(classId, fullUser.id)
            .then(() =>{
                successNotification(
                    "Class Left",
                    `Class was successfully Left`
                );
                navigate(`/dashboard/${orgName}`)
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
                handleLeaveClass();
            }}
        >
           Leave Class<LuTrash2 />
        </Button>
    )
}