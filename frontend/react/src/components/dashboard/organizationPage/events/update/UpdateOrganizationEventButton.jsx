import {
    Button,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {FiEdit2} from "react-icons/fi";
import React from "react";
import UpdateOrganizationEventForm from "./UpdateOrganizationEventForm.jsx";

export default function UpdateOrganizationEventButton({event, onSuccess}){

    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
            <Button bg={"transparent"} borderRadius={"full"} padding={"0px"}
                    onClick={onOpen}
            >
                <FiEdit2/>
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new event</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody >
                        <UpdateOrganizationEventForm event={event} onSuccess={onSuccess}/>
                    </ModalBody>

                    <ModalFooter>

                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}