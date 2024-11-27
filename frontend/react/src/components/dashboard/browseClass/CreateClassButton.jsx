import {
    Button, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay,

    useDisclosure
} from "@chakra-ui/react";

import CreateClassForm from "./CreateClassForm.jsx";
import {AddIcon, CloseIcon} from "@chakra-ui/icons";

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
