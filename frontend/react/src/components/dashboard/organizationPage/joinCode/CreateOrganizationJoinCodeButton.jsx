import {
    Button, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import CreateOrganizationJoinCodeForm from "./CreateOrganizationJoinCodeForm.jsx";
import {AddIcon} from "@chakra-ui/icons";

// Main Register Component
const CreateOrganizationJoinCodeButton = ({onSuccess,fullUser,id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <Button
            leftIcon={<AddIcon/>}
            maxW={"200px"}
            backgroundColor={"#7E3BB5"}
            color={"white"}

            _active={{
                transform: "scale(1)" // Return to original size when clicked
            }}
            onClick={onOpen}
        >
            New Code
        </Button>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new invitation code</ModalHeader>
                <ModalCloseButton />

                <ModalBody >
                    <CreateOrganizationJoinCodeForm id={id} fullUser={fullUser} onSuccess={onSuccess}/>
                </ModalBody>

                <ModalFooter>

                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

export default CreateOrganizationJoinCodeButton;
