'use client'

import {
    Button,
    Flex,
    Heading,
    Stack,
    Image,
} from '@chakra-ui/react'
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import LoginForm from "./LoginForm.jsx";

const Login = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    })

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} position="relative">
            {/* Quick Check Logo and Text Buttons in the Top-Left */}
            <Flex position="absolute" top="60px" left="60px" direction="row" align="center" spacing="10px">
                <Button
                    width="78px"
                    height="auto"
                    padding={"0px"}
                    background={"transparent"}
                    _hover={{ background: "transparent" }}
                    onClick={() => navigate("/")}
                >
                    <Image src={"/QuickCheckTransparent.png"} />
                </Button>
                <Button
                    fontFamily="Inter"
                    fontWeight="bold"
                    fontSize="26px"
                    color="#313131"
                    textAlign="left"
                    padding={"0px"}
                    background={"transparent"}
                    _hover={{ background: "transparent" }}
                    onClick={() => navigate("/")}
                >
                    Quick Check
                </Button>
            </Flex>

            {/* Main login section */}
            <Flex p={8} flex={1} align={'center'} justify={'center'} >
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <LoginForm/>
                </Stack>
            </Flex>
        </Stack>
    )
}
export default Login;
