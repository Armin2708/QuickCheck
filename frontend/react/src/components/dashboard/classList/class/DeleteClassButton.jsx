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
import {errorNotification, successNotification} from "../../../../services/notification.js";
import {deleteClass} from "../../../../services/client/classes.js";
import {useNavigate, useParams} from "react-router-dom";

function DeleteClassButton({ id:classId,name:className, onSuccess }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const navigate = useNavigate();
    const {name} = useParams()

    const handleDelete = () => {
        deleteClass(classId)
            .then(()=>{
                successNotification(`${className} deleted successfully.`);
                onClose();
                navigate(`/dashboard/${name}`)
                onSuccess()
            })
            .catch((error)=>{
                errorNotification("Failed to delete the Class.");
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
                            Delete {className}
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

export default DeleteClassButton;
