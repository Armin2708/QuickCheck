import React from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import {deleteOrganization, getOrganizationByName} from "../../../../services/client.js";
import {errorNotification, successNotification} from "../../../../services/notification.js";

function DeleteOrganizationButton({ orgName, onSuccess }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const handleDelete = async () => {
        getOrganizationByName(orgName)
            .then((res) =>{
                deleteOrganization(res.data.id)
                    .then(()=>{
                        successNotification("Success", orgName+" Deleted")
                        onClose()
                        onSuccess()
                    })
                    .catch((err)=>{
                        errorNotification("Error", err.code)
                    })
            })
            .catch((err) =>{
                errorNotification("Error", err.code)
            })
    };

    return (
        <>
            <Button
                bg={'red'}
                color={'white'}
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg'
                }}
                onClick={()=>{
                    onOpen()
                }}
            >
                Delete
            </Button>

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete {orgName}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={()=>{
                                handleDelete()
                            }} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default DeleteOrganizationButton;
