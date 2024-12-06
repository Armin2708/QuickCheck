import {
    AlertDialog, AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import React from "react";
import {errorNotification, successNotification} from "../../../../../services/notification.js";
import {LuTrash2} from "react-icons/lu";
import {deleteOrganizationEvent} from "../../../../../services/client/organizationEvent.js";

export default function DeleteOrganizationEventButton({eventId, onSuccess}){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const handleDelete = () => {
        deleteOrganizationEvent(eventId)
            .then(() => {
                successNotification(`Event deleted successfully.`);
                onSuccess();
                onClose();
            })
            .catch((error) => {
                errorNotification("Failed to delete event.");
            })

    }

    return(
        <>
            <Button bg={"transparent"} borderRadius={"full"} padding={"0px"}
                    onClick={()=>{
                        onOpen()
                    }}
            >
                <LuTrash2 />
            </Button>

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Event
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={()=>{
                                handleDelete();
                            }} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}