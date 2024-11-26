import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {FiEdit2} from "react-icons/fi";
import React from "react";
import UpdateOrganizationJoinCodeForm from "./UpdateOrganizationJoinCodeForm.jsx";

export default function UpdateOrganizationJoinCodeButton({id,usageLimit,onSuccess}){

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
                    <ModalHeader>Create new invitation code</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody >
                        <UpdateOrganizationJoinCodeForm id={id} usageLimit={usageLimit} onSuccess={onSuccess}/>
                    </ModalBody>

                    <ModalFooter>

                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}