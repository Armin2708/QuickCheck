import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import React from "react";
import UpdateEventForm from "./UpdateEventForm.jsx";

export default function UpdateEventButton({selectedEvent, updateEvent, onSuccess}){

    const { isOpen, onOpen , onClose } = useDisclosure()

    return(
        <>
            <Button onClick={onOpen}>
                Update
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UpdateEventForm selectedEvent={selectedEvent} updateEvent={updateEvent} onSuccess={onSuccess}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}