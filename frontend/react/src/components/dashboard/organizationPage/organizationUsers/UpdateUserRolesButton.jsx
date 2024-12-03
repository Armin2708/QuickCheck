import {
    Button, Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";

import UpdateUserRolesForm from "./UpdateUserRolesForm.jsx";
import ClassCard from "../../classList/class/ClassCard.jsx";
import React from "react";

const CloseIcon = () => "x";

const UpdateUserRolesButton = ({userId,organizationName,roles,onSuccess}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            _hover={{
                bg: 'blue.500',
            }}
            _focus={{
                bg: 'blue.500',
            }}
            onClick={onOpen}
        >
            Roles
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Update Roles</DrawerHeader>

                <DrawerBody>
                    <UpdateUserRolesForm userId={userId} organizationName={organizationName} roles={roles} onSuccess={onSuccess}/>
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
                        }}
                    >
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>

}
export default UpdateUserRolesButton;