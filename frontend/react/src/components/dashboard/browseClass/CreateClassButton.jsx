import {
    Button,
    Drawer, DrawerBody, DrawerCloseButton,
    DrawerContent, DrawerFooter, DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import CreateClassForm from "./CreateClassForm.jsx";
import {AddIcon, CloseIcon} from "@chakra-ui/icons";
import Multistep from "./CreateClassForm.jsx";

// Main Register Component
const CreateClassButton = ({onSuccess}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button
            leftIcon={<AddIcon/>}
            backgroundColor={"#7E3BB5"}
            color={"white"}

            _active={{
                transform: "scale(1)" // Return to original size when clicked
            }}
            onClick={onOpen}
        >
            Create Class

        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Class</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CreateClassForm onSuccess={onSuccess} />
                </ModalBody>

                <ModalFooter>
                    <Button
                        backgroundColor={"#7E3BB5"}
                        color={"white"}

                        _active={{
                            transform: "scale(1)" // Return to original size when clicked
                        }}
                        onClick={()=>{
                            onClose()
                            onSuccess();
                        }}
                        >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

export default CreateClassButton;
