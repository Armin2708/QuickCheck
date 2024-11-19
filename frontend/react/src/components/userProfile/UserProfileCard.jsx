import {
    Avatar,
    Badge,
    Box,
    Button,
    Center,
    Heading,
    HStack,
    Stack,
    Text,
    useColorModeValue,
    WrapItem
} from "@chakra-ui/react";
import UpdateUserProfileButton from "./UpdateUserProfileButton.jsx";
import UpdateUserButton from "../userList/UpdateUserButton.jsx";
import UpdateUserRolesButton from "../userList/UpdateUserRolesButton.jsx";
import DeleteUserButton from "../userList/DeleteUserButton.jsx";
import DeleteUserProfileButton from "./DeleteUserProfileButton.jsx";
import {getUserProfilePictureUrl} from "../../services/client.js";

export default function UserProfileCard({id,name,email,address,dateOfBirth,gender,roles, onSuccess, userProfile }){
    return(
            <Center py={6} >
                <Box
                    maxW={'320px'}
                    w={'full'}
                    bg={() =>useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
                    <Avatar
                        size={'xl'}
                        src={getUserProfilePictureUrl(id)|| null}
                        mb={4}
                        pos={'relative'}
                        _after={{
                            content: '""',
                            w: 4,
                            h: 4,
                            bg: 'green.300',
                            border: '2px solid white',
                            rounded: 'full',
                            pos: 'absolute',
                            bottom: 0,
                            right: 3,
                        }}
                    />
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {name}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} mb={4}>
                        {email}
                    </Text>
                    <Text
                        textAlign={'center'}
                        color={() =>useColorModeValue('gray.700', 'gray.400')}
                        px={3}
                    >
                        {address}
                    </Text>
                    <Text color={'blue.400'}>{dateOfBirth}</Text>
                    <Text
                        textAlign={'center'}
                        color={() =>useColorModeValue('gray.700', 'gray.400')}
                        px={3}
                    >
                        {gender}
                    </Text>

                    <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                        {Array.isArray(roles) && roles.length > 0 ? (
                            roles.map((role) => (
                                <Badge
                                    key={role}
                                    px={2}
                                    py={1}
                                    bg={() =>useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    {role}
                                </Badge>
                            ))
                        ) : (
                            <WrapItem>
                                <Text>
                                    No roles
                                </Text>
                            </WrapItem>
                        )}
                    </Stack>

                    <Stack mt={8} direction={'row'} spacing={4}>
                        {userProfile ?
                            <HStack>
                                <UpdateUserProfileButton
                                    userId={id} name={name} address={address}
                                    email={email} dateOfBirth={dateOfBirth}
                                    gender={gender} onSuccess={onSuccess}
                                />
                                <DeleteUserProfileButton userId={id} name={name} />
                            </HStack>
                            :
                            (<HStack>
                                <UpdateUserButton
                                    userId={id} name={name} address={address}
                                    email={email} dateOfBirth={dateOfBirth}
                                    gender={gender} onSuccess={onSuccess}
                                />
                                <UpdateUserRolesButton userId={id} roles={roles}/>
                                <DeleteUserButton userId={id} name={name} onSuccess={onSuccess} />
                            </HStack>)
                        }
                    </Stack>
                </Box>
            </Center>
    )
}