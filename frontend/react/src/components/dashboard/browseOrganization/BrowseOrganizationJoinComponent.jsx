import {
    Box,
    Button,
    Stack,
    Center,
    Input,
    HStack,
    Text,
    FormControl,
    FormLabel, FormHelperText, FormErrorMessage, useColorModeValue, Image, Heading, VStack
} from "@chakra-ui/react";
import { useState } from "react";

import {useNavigate} from "react-router-dom";
import {
    decrementOrganizationJoinCode,
    getOrganizationById,
    joinOrganization,
    verifyOrganizationJoinCode
} from "../../../services/client.js";
import {errorNotification} from "../../../services/notification.js";


export default function BrowseOrganizationJoinComponent({fullUser,navigate}) {
    const [organization, setOrganization] = useState();
    const [code, setCode] = useState()
    const [step, setStep] = useState(1)

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
                errorNotification("Invalid Code",err.response.data.message)
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
            bg={() => useColorModeValue("white", "#1D1D1D")}
            borderRadius={"12px"}
            width={"500px"}
            height={"500px"}
            display="flex"
            flexDirection="column"
            justifyContent="space-between" /* Space between the top and center elements */
            padding={"20px"}
            boxShadow={"lg"}
        >
            {/* Top-aligned Text */}
            <Text textAlign={"left"} width={"100%"} mb={"auto"} padding={"10px"} fontWeight={"Bold"} fontSize={"lg"}>
                Join New Organization
            </Text>

            {/* Center-aligned Box */}
            <Box
                flex={1} /* Take up remaining space */
                display="flex"
                flexDirection="column"
                justifyContent="center" /* Center vertically */
                alignItems="center" /* Center horizontally */
                gap={"20px"}
            >
                {step === 1 ? (
                    <Box maxW={"400px"}>
                        <FormControl isInvalid={code === null}>
                            <FormLabel>Code</FormLabel>
                            <Input
                                type="number"
                                value={code || ""}
                                borderColor={() => useColorModeValue("#1D1D1D", "white")}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            {!(code === null) ? (
                                <FormHelperText>
                                    Enter the code given by the organization.
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Code is required.</FormErrorMessage>
                            )}
                        </FormControl>
                    </Box>
                ) : (
                    <Center paddingTop={12}>
                        <VStack>
                            <Box
                                role={"group"}
                                p={6}
                                maxW={"330px"}
                                w={"full"}
                                bg={useColorModeValue("white", "gray.800")}
                                boxShadow={"2xl"}
                                rounded={"lg"}
                                pos={"relative"}
                                zIndex={1}
                            >
                                <Box
                                    rounded={"lg"}
                                    mt={-12}
                                    pos={"relative"}
                                    height={"230px"}
                                    _after={{
                                        transition: "all .3s ease",
                                        content: '""',
                                        w: "full",
                                        h: "full",
                                        pos: "absolute",
                                        top: 5,
                                        left: 0,
                                        backgroundImage: `url(https://media.istockphoto.com/id/1349030917/photo/business-and-finance-looking-up-at-high-rise-office-buildings-in-the-financial-district-of-a.jpg?s=612x612&w=0&k=20&c=NSnN0va-f1OBG_GA7bTVmUIoBwNDKUXtHD8_PzeTNiA=)`,
                                        filter: "blur(15px)",
                                        zIndex: -1,
                                    }}
                                    _groupHover={{
                                        _after: {
                                            filter: "blur(20px)",
                                        },
                                    }}
                                >
                                    <Image
                                        rounded={"lg"}
                                        height={230}
                                        width={282}
                                        objectFit={"cover"}
                                        src={
                                            "https://media.istockphoto.com/id/1349030917/photo/business-and-finance-looking-up-at-high-rise-office-buildings-in-the-financial-district-of-a.jpg?s=612x612&w=0&k=20&c=NSnN0va-f1OBG_GA7bTVmUIoBwNDKUXtHD8_PzeTNiA="
                                        }
                                        alt="#"
                                    />
                                </Box>
                                <Stack pt={10} align={"center"}>
                                    <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
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
        </Box>
    );
}
