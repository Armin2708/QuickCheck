import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import UpdateClassForm from "./UpdateClassForm.jsx";

const UpdateClassButton = ({professorId,id,name, location, startDate, endDate,onSuccess }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button
            bg={'gray.200'}
            color={'black'}
            _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
            }}
            onClick={onOpen}
        >
            Update
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>Update classroom</DrawerHeader>

                <DrawerBody>
                    <UpdateClassForm
                        professorId={professorId}
                        id={id}
                        name={name}
                        location={location}
                        startDate={startDate}
                        endDate={endDate}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        backgroundColor={"#7E3BB5"}
                        color={"white"}

                        _active={{
                            transform: "scale(1)" // Return to original size when clicked
                        }}
                        onClick={()=>{
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
export default UpdateClassButton;