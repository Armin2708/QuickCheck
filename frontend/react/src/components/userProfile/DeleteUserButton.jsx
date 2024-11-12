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
import {errorNotification, successNotification} from "../../services/notification.js";
import {deleteClass, deleteUser} from "../../services/client.js";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function DeleteUserButton({ userId, name, }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const {logOut} = useAuth()
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await deleteUser(userId);
            successNotification(`${name} deleted successfully.`);
            onClose();
            logOut();
            navigate("/login")

        } catch (error) {
            errorNotification("Failed to delete the customer.");
        }

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

export default DeleteUserButton;
