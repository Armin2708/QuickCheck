import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import {leaveOrganization} from "../../../../services/client/organizations.js";
import {successNotification} from "../../../../services/notification.js";
import {useAuth} from "../../../context/AuthContext.jsx";
import React from "react";

export default function OrganizationKickButton({userId,userName, organizationId, onSuccess}){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const {fullUser} = useAuth()

    const handleKick = () =>{
        leaveOrganization(userId, organizationId)
            .then((res) =>{
                successNotification("Success", "User was kicked successfully")
                onSuccess();
                onClose();
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    return(
        <>
            <Button
                fontSize={'sm'}
                rounded={'full'}
                bg={'red.500'}
                color={'white'}
                _hover={{
                    bg: 'red.100',
                }}
                _focus={{
                    bg: 'red.100',
                }}
                onClick={onOpen}
                isDisabled={fullUser?.id===userId}
            >
                Kick
            </Button>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Kick {userName}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={()=>{
                                handleKick();
                            }} ml={3}>
                                Kick
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}