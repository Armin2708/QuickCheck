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
import UpdateUserProfileForm from "./UpdateUserProfileForm.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import UpdateUserForm from "./UpdateUserForm.jsx";

const CloseIcon = () => "x";

const UpdateUserButton = ({userId,name,address,email,dateOfBirth,gender,roles,onSuccess}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
                bg: 'blue.500',
            }}
            _focus={{
                bg: 'blue.500',
            }}
            onClick={onOpen}
        >
            Update
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Update my profile</DrawerHeader>

                <DrawerBody>
                    <UpdateUserForm id={userId} name={name} address={address} email={email} dateOfBirth={dateOfBirth} gender={gender} roles={roles}/>
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        leftIcon={<CloseIcon/>}
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
export default UpdateUserButton;