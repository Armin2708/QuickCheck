import { Stack, Box, Text } from '@chakra-ui/react'
import HeaderFooterWrapper from "../shared/HeaderFooterWrapper.jsx";

export default function LoginRegisterPage(){
    return(
        <HeaderFooterWrapper>
            <Stack
                paddingX="67px"
                paddingY="39px"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                width="869px"
                height="393px"
                maxWidth="100%"
                background="#F9F9F9"
            >
                <Stack
                    direction="row"
                    justify="space-between"
                    align="center"
                    spacing="234px"
                    width="692px"
                    height="315px"
                    maxWidth="100%"
                >
                    <Stack
                        justify="flex-start"
                        align="flex-start"
                        spacing="29px"
                        width="194px"
                        height="315px"
                    >
                        <Box width="78px" height="75px" />
                        <Stack
                            paddingStart="10px"
                            justify="center"
                            align="flex-start"
                            spacing="22px"
                            width="161px"
                            height="78px"
                        >
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="26px"
                                color="#313131"
                            >
                                Sign In
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="15px"
                                color="#313131"
                                textAlign="center"
                            >
                                Use your school email
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack
                        justify="flex-end"
                        align="center"
                        spacing="45px"
                        width="292px"
                        height="191px"
                        maxWidth="100%"
                    >
                        <Stack
                            justify="flex-start"
                            align="center"
                            spacing="10px"
                            alignSelf="stretch"
                        >
                            <Stack
                                paddingX="17px"
                                paddingY="5px"
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="10px"
                                borderColor="#313131"
                                borderStartWidth="1px"
                                borderEndWidth="1px"
                                borderTopWidth="1px"
                                borderBottomWidth="1px"
                                height="40px"
                                alignSelf="stretch"
                                background="#F9F9F9"
                            >
                                <Text
                                    fontFamily="Inter"
                                    fontWeight="medium"
                                    fontSize="16px"
                                    color="#313131"
                                >
                                    Email
                                </Text>
                            </Stack>
                            <Text
                                fontFamily="Inter"
                                fontWeight="medium"
                                fontSize="14px"
                                color="#EC221F"
                                alignSelf="stretch"
                            >
                                *possible error message*
                            </Text>
                        </Stack>
                        <Stack
                            paddingStart="77px"
                            direction="row"
                            justify="flex-end"
                            align="center"
                            spacing="16px"
                            alignSelf="stretch"
                        >
                            <Stack
                                paddingX="30px"
                                paddingY="25px"
                                borderRadius="10px"
                                direction="row"
                                justify="center"
                                align="center"
                                spacing="10px"
                                width="134px"
                                height="36px"
                                background="#F9F9F9"
                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                            >
                                <Text
                                    fontFamily="Inter"
                                    fontWeight="semibold"
                                    fontSize="14px"
                                    color="#707070"
                                    textAlign="center"
                                >
                                    Create account
                                </Text>
                            </Stack>
                            <Stack
                                paddingX="22px"
                                paddingY="23px"
                                borderRadius="10px"
                                direction="row"
                                justify="center"
                                align="center"
                                spacing="10px"
                                width="81px"
                                height="36px"
                                background="#7E3BB5"
                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                            >
                                <Text
                                    fontFamily="Inter"
                                    fontWeight="medium"
                                    fontSize="14px"
                                    color="#FFFFFF"
                                    width="69px"
                                    textAlign="center"
                                >
                                    Next
                                </Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                paddingX="67px"
                paddingY="39px"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                width="869px"
                height="393px"
                maxWidth="100%"
            >
                <Stack
                    paddingX="67px"
                    paddingY="39px"
                    justify="flex-start"
                    align="flex-start"
                    spacing="10px"
                    width="869px"
                    height="393px"
                    maxWidth="100%"
                    background="#F9F9F9"
                >
                    <Stack
                        direction="row"
                        justify="space-between"
                        align="center"
                        spacing="234px"
                        width="692px"
                        height="315px"
                        maxWidth="100%"
                    />
                </Stack>
                <Stack direction="row" justify="flex-start" align="center" spacing="206px">
                    <Stack
                        justify="flex-start"
                        align="flex-start"
                        spacing="29px"
                        width="194px"
                        height="315px"
                    >
                        <Box width="78px" height="75px" />
                        <Stack
                            paddingStart="10px"
                            justify="center"
                            align="flex-start"
                            spacing="22px"
                            width="161px"
                            height="78px"
                        >
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="26px"
                                color="#313131"
                            >
                                Hi “Username”
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="15px"
                                color="#313131"
                                textAlign="center"
                            >
                                Use your school email
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack
                        paddingY="45px"
                        justify="flex-start"
                        align="flex-start"
                        spacing="10px"
                        width="292px"
                        height="191px"
                        maxWidth="100%"
                    >
                        <Stack
                            justify="flex-end"
                            align="center"
                            spacing="45px"
                            width="292px"
                            height="191px"
                            maxWidth="100%"
                        >
                            <Stack
                                paddingStart="77px"
                                direction="row"
                                justify="flex-end"
                                align="center"
                                spacing="16px"
                                alignSelf="stretch"
                            >
                                <Stack
                                    paddingX="30px"
                                    paddingY="25px"
                                    borderRadius="10px"
                                    direction="row"
                                    justify="center"
                                    align="center"
                                    spacing="10px"
                                    width="156px"
                                    height="36px"
                                    background="#F9F9F9"
                                    boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                >
                                    <Text
                                        fontFamily="Inter"
                                        fontWeight="semibold"
                                        fontSize="14px"
                                        color="#707070"
                                        textAlign="center"
                                    >
                                        Forgot Password ?
                                    </Text>
                                </Stack>
                                <Stack
                                    paddingX="22px"
                                    paddingY="23px"
                                    borderRadius="10px"
                                    direction="row"
                                    justify="center"
                                    align="center"
                                    spacing="10px"
                                    width="81px"
                                    height="36px"
                                    background="#7E3BB5"
                                    boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                >
                                    <Text
                                        fontFamily="Inter"
                                        fontWeight="medium"
                                        fontSize="14px"
                                        color="#FFFFFF"
                                        width="69px"
                                        textAlign="center"
                                    >
                                        Next
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack
                            justify="flex-start"
                            align="flex-start"
                            spacing="6px"
                            width="292px"
                            maxWidth="100%"
                        >
                            <Stack
                                justify="flex-start"
                                align="center"
                                spacing="10px"
                                alignSelf="stretch"
                            >
                                <Stack
                                    paddingX="17px"
                                    paddingY="5px"
                                    direction="row"
                                    justify="flex-start"
                                    align="center"
                                    spacing="10px"
                                    borderColor="#313131"
                                    borderStartWidth="1px"
                                    borderEndWidth="1px"
                                    borderTopWidth="1px"
                                    borderBottomWidth="1px"
                                    height="40px"
                                    alignSelf="stretch"
                                    background="#F9F9F9"
                                >
                                    <Text
                                        fontFamily="Inter"
                                        fontWeight="medium"
                                        fontSize="16px"
                                        color="#313131"
                                    >
                                        Enter your password
                                    </Text>
                                </Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="19px"
                            >
                                <Box
                                    width="14px"
                                    height="13px"
                                    background="#F9F9F9"
                                    borderColor="#000000"
                                    borderStartWidth="1px"
                                    borderEndWidth="1px"
                                    borderTopWidth="1px"
                                    borderBottomWidth="1px"
                                />
                                <Text
                                    fontFamily="Inter"
                                    fontWeight="medium"
                                    fontSize="11px"
                                    color="#000000"
                                    textAlign="center"
                                >
                                    Show password
                                </Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </HeaderFooterWrapper>

)
}