import {
    Button,
    Drawer, DrawerBody, DrawerCloseButton,
    DrawerContent, DrawerFooter, DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import CreateOrganizationForm from "./CreateOrganizationForm.jsx";
import {AddIcon, CloseIcon} from "@chakra-ui/icons";

// Main Register Component
const CreateOrganizationButton = ({onSuccess}) => {
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
            Create Organization

        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create new Organization</DrawerHeader>

                <DrawerBody>
                    <CreateOrganizationForm />
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        leftIcon={<CloseIcon/>}
                        backgroundColor={"#7E3BB5"}
                        color={"white"}

                        _active={{
                            transform: "scale(1)" // Return to original size when clicked
                        }}
                        onClick={()=> {
                            onClose()
                            onSuccess()
                        }}
                    >
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}

export default CreateOrganizationButton;
