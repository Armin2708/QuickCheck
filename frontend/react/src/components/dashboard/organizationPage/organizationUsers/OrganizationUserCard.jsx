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
import UpdateUserRolesButton from "./UpdateUserRolesButton.jsx";
import {getUserProfilePictureUrl} from "../../../../services/client/users.js";
import OrganizationKickButton from "./OrganizationKickButton.jsx";

export default function OrganizationUserCard({id,name,email,address,dateOfBirth,gender,accountType,roles, organizationId,organizationName, onSuccess}){
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
                        <Badge
                            px={2}
                            py={1}
                            bg={() =>useColorModeValue('gray.50', 'gray.800')}
                            fontWeight={'400'}>
                            {accountType}
                        </Badge>
                    </Stack>

                    <Stack mt={8} direction={'row'} spacing={4} justifyContent={"center"} alignItems={"center"}>
                            <UpdateUserRolesButton userId={id} roles={roles} organizationName={organizationName} onSuccess={onSuccess}/>
                            <OrganizationKickButton userId={id} userName={name} organizationId={organizationId} onSuccess={onSuccess} />
                    </Stack>
                </Box>
            </Center>
    )
}