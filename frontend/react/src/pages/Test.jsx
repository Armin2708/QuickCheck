import {
    Box,
    Button,
    Stack,
    Wrap,
    WrapItem,
    Center,
    Spinner,
    Input,
    HStack,
    Text,
    FormControl,
    FormLabel, FormHelperText, FormErrorMessage, useColorModeValue, Image, Heading, VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    decrementOrganizationJoinCode,
    getOrganizationById,
    joinOrganization, verifyOrganizationJoinCode
} from "../services/client.js";
import { useAuth } from "../components/context/AuthContext.jsx";
import {errorNotification} from "../services/notification.js";
import {useNavigate} from "react-router-dom";


export default function Test() {
    const [organization, setOrganization] = useState();
    const [code, setCode] = useState()
    const { fullUser,isAdmin } = useAuth();
    const [step, setStep] = useState(1)

    const navigate = useNavigate()


    const getOrgWithCode = () =>{
        verifyOrganizationJoinCode(code)
            .then((res) =>{
                getOrganizationById(res.data.organizationId)
                    .then((res) => {
                        setOrganization(res.data);
                        setStep(2);
                    })
                    .catch((error) => {
                        console.error("Error fetching organization:", error);
                    });
            })
            .catch((err) =>{
                console.log(err)
                errorNotification("Invalid Code","This code is invalid or expired")
            })
    }

    const useCodeToJoinOrg = () => {
        joinOrganization(organization?.id, fullUser?.id)
            .then(() => {
                decrementOrganizationJoinCode(code)
                    .then(() =>{
                        navigate(`/dashboard/${organization?.name}`)
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
            })
            .catch((error) => {
                console.error("Error fetching user organizations:", error);
            });
    };

    const handleOnClickStep1 = () =>{
        getOrgWithCode();

    }
    const handleOnClickStep2 = () =>{
            useCodeToJoinOrg()
    }

    return (
        <Box
            bg={"green"}
            borderRadius={"12px"}
            width={"500px"}
            height={"500px"}
            gap={"20px"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding={"20px"}
        >
            {step === 1 ? (
                <Box maxW={"400px"}>
                    <FormControl isInvalid={code === null}>
                        <FormLabel>Code</FormLabel>
                        <Input type='number' value={code || ""} onChange={(e) => setCode(e.target.value)} />
                        {!(code === null) ? (
                            <FormHelperText>
                                Enter the code given by the organization.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        )}
                    </FormControl>
                </Box>
            ) : (
                <Center paddingTop={12}>
                    <VStack>
                        <Box
                            role={'group'}
                            p={6}
                            maxW={'330px'}
                            w={'full'}
                            bg={useColorModeValue('white', 'gray.800')}
                            boxShadow={'2xl'}
                            rounded={'lg'}
                            pos={'relative'}
                            zIndex={1}>
                            <Box
                                rounded={'lg'}
                                mt={-12}
                                pos={'relative'}
                                height={'230px'}
                                _after={{
                                    transition: 'all .3s ease',
                                    content: '""',
                                    w: 'full',
                                    h: 'full',
                                    pos: 'absolute',
                                    top: 5,
                                    left: 0,
                                    backgroundImage: `url(https://media.istockphoto.com/id/1349030917/photo/business-and-finance-looking-up-at-high-rise-office-buildings-in-the-financial-district-of-a.jpg?s=612x612&w=0&k=20&c=NSnN0va-f1OBG_GA7bTVmUIoBwNDKUXtHD8_PzeTNiA=)`,
                                    filter: 'blur(15px)',
                                    zIndex: -1,
                                }}
                                _groupHover={{
                                    _after: {
                                        filter: 'blur(20px)',
                                    },
                                }}>
                                <Image
                                    rounded={'lg'}
                                    height={230}
                                    width={282}
                                    objectFit={'cover'}
                                    src={"https://media.istockphoto.com/id/1349030917/photo/business-and-finance-looking-up-at-high-rise-office-buildings-in-the-financial-district-of-a.jpg?s=612x612&w=0&k=20&c=NSnN0va-f1OBG_GA7bTVmUIoBwNDKUXtHD8_PzeTNiA="}
                                    alt="#"
                                />
                            </Box>
                            <Stack pt={10} align={'center'}>
                                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                    {organization?.name}
                                </Heading>
                            </Stack>
                        </Box>
                        <Text>You're about to join {organization?.name}</Text>
                    </VStack>
                </Center>
            )}
            <HStack>
                <Button
                    isDisabled={step === 1}
                    onClick={() => {
                        setStep(1);
                    }}
                >
                    Back
                </Button>
                <Button
                    isDisabled={!code}
                    onClick={() => {
                        step === 1 ? handleOnClickStep1() : handleOnClickStep2();
                    }}
                >
                    {step === 1 ? "Verify" : "Join"}
                </Button>
            </HStack>
        </Box>
    );
}
