import {Button, Flex, Heading, Image, Stack, Text} from "@chakra-ui/react";
import RegisterForm from "../register/RegisterForm.jsx";
import ResetPasswordForm from "./ResetPasswordForm.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

export default function ResetPassword(){

    const { user,setUserFromToken } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    return(
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} position="relative">
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
                    onClick={() => {
                        navigate("/")
                    }}
                >
                    Quick Check
                </Button>
            </Flex>

            {/* Main Registration Section */}
            <Flex p={8} flex={1} align={'center'} justify={'center'} >
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Reset Password</Heading>
                    <ResetPasswordForm
                        initialStep={searchParams.get("step") === "verify" ? 2 : 1}
                        token={searchParams.get("token")}
                        onSuccess={(token) => {
                            localStorage.setItem("access_token", token);
                            setUserFromToken();
                            navigate("/dashboard");
                        }}
                    />
                </Stack>
            </Flex>
        </Stack>
    )
}