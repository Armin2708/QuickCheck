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
import {errorNotification, successNotification} from "../../../services/notification.js";
import {deleteUser} from "../../../services/client/users.js";

function DeleteUserButton({ userId, name, onSuccess }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const handleDelete = () => {
        deleteUser(userId)
            .then(() => {
                successNotification(`${name} deleted successfully.`);
                console.log(onSuccess)
                onClose();
                onSuccess();
            })
            .catch((error) => {
                errorNotification("Failed to delete the customer.");
                console.log(error)
            })
    }


    return (
        <>
            <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
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
                            Delete {name}
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
    );
}

export default DeleteUserButton;
