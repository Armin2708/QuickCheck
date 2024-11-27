import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button, useDisclosure
} from "@chakra-ui/react";
import {LuTrash2} from "react-icons/lu";
import React from "react";

import {deleteOrganizationJoinCode} from "../../../../services/client/organizationJoinCode.js";
import {errorNotification, successNotification} from "../../../../services/notification.js";

export default function DeleteOrganizationJoinCodeButton({id, onSuccess}){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const handleDelete = () => {
        deleteOrganizationJoinCode(id)
            .then(() => {
                successNotification(`Code deleted successfully.`);
                onSuccess();
                onClose();
            })
            .catch((error) => {
                errorNotification("Failed to delete the code.");
                console.log(error)
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
                            Delete Code
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