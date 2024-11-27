import { useCallback} from "react";
import {
    getUserProfilePictureUrl,
    uploadUserProfilePicture
} from "../../../services/client/users.js";
import { errorNotification, successNotification } from "../../../services/notification.js";
import { useDropzone } from "react-dropzone";
import { Avatar, Box, Icon, Text } from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import {getClassProfilePictureUrl, uploadClassProfilePicture} from "../../../services/client/classes.js";

export default function MyUserDropzone({ userId }) {

    const onDrop = useCallback(acceptedFiles => {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        uploadUserProfilePicture(userId, formData)
            .then(() => {
                successNotification("Success", "Picture uploaded");
            })
            .catch((err) => {
                console.log(err)
                errorNotification("Error",
                    err.response.data.message);
            });
    }, [userId]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024, // 5MB in bytes
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Box textAlign="center">
                <Box position="relative" w="fit-content" mx="auto" _hover={{ cursor: "pointer" }}>
                    <Avatar
                        size="2xl"
                        name="Dan Abrahmov"
                        src={getUserProfilePictureUrl(userId)|| null} // Set fetched image URL as the src
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                            filter: 'brightness(0.5)' // Darkens the avatar on hover
                        }}
                    />
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        opacity="0"
                        _hover={{ opacity: 1 }} // Show overlay with pen on hover
                        bg="rgba(0, 0, 0, 0.5)" // Semi-transparent dark overlay
                        borderRadius="full"
                        transition="opacity 0.2s"
                    >
                        <Icon as={FiEdit2} color="white" boxSize={6} />
                    </Box>
                </Box>
                <Text mt={2}>edit</Text>
            </Box>
        </div>
    );
}

export function MyClassDropzone({ classId }) {



    const onDrop = useCallback(acceptedFiles => {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        uploadClassProfilePicture(classId, formData)
            .then(() => {
                successNotification("Success", "Picture uploaded");
            })
            .catch(err => {
                errorNotification("Error", "Picture upload failed");
            });
    }, [classId]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024, // 5MB in bytes
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Box textAlign="center">
                <Box position="relative" w="fit-content" mx="auto" _hover={{ cursor: "pointer" }}>
                    <Avatar
                        size="2xl"
                        name="Dan Abrahmov"
                        src={getClassProfilePictureUrl(classId) || null} // Set fetched image URL as the src
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                            filter: 'brightness(0.5)' // Darkens the avatar on hover
                        }}
                    />
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        opacity="0"
                        _hover={{ opacity: 1 }} // Show overlay with pen on hover
                        bg="rgba(0, 0, 0, 0.5)" // Semi-transparent dark overlay
                        borderRadius="full"
                        transition="opacity 0.2s"
                    >
                        <Icon as={FiEdit2} color="white" boxSize={6} />
                    </Box>
                </Box>
                <Text mt={2}>edit</Text>
            </Box>
        </div>
    );
}
