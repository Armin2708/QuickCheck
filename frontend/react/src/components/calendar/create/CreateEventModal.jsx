import React, {useEffect, useState} from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import CreateEventForm from "./CreateEventForm.jsx";

export default function CreateEventModal({isCreateOpen,onCloseCreate, selectedDate, setEvents, onSuccess, fullUser, classId}){

    return(
        <Modal isOpen={isCreateOpen} onClose={onCloseCreate}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Event</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CreateEventForm selectedDate={selectedDate} onSuccess={onSuccess} fullUser={fullUser} classId={classId}/>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onCloseCreate}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}