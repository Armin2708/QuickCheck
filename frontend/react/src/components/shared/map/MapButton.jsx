import {
    Button,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import MapPage from "./MapPage.jsx";
import {CheckIcon} from "@chakra-ui/icons";

const MapButton = ({ onLocationSelect }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCoordinates, setSelectedCoordinates] = useState(null); // Store selected coordinates

    return (
        <>
            <Button
                marginTop={"10px"}
                backgroundColor={"white"}
                color={"#7E3BB5"}
                colorScheme="#7E3BB5"
                _active={{ transform: "scale(1)" }}
                _hover={{backgroundColor: "#EED9FF"}}
                onClick={onOpen}
                variant="outline"
                rightIcon={selectedCoordinates && <CheckIcon/>}
            >
                Select Location
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Class</ModalHeader>
                    <ModalBody>
                        <MapPage
                            onMarkerSet={(lat, lng) => {
                                setSelectedCoordinates({ lat, lng }); // Store coordinates when marker is set
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            backgroundColor={"#7E3BB5"}
                            color={"white"}
                            _active={{ transform: "scale(1)" }}
                            onClick={() => {
                                if (selectedCoordinates) {
                                    onLocationSelect(selectedCoordinates.lat, selectedCoordinates.lng); // Set location
                                }
                                onClose(); // Close modal
                            }}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MapButton;
