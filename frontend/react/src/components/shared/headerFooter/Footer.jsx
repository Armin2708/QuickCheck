'use client'

import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    chakra,
    useColorModeValue, Button,
} from '@chakra-ui/react'
import {FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";
import {FaSquareXTwitter} from "react-icons/fa6";

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    )
}


export default function Footer() {
    return (
        <Box
            as="footer"
            position="relative"
            bottom="0"
            width="100%"
            mt="auto"
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Container as={Stack} maxW={'6xl'} py={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                    <Stack align={'flex-start'}>
                        <ListHeader>Company</ListHeader>
                        <Box as="a" href={'#'}>
                            About Us
                        </Box>
                        <Box as="a" href={'#'}>
                            Blog
                        </Box>
                        <Box as="a" href={'#'}>
                            Careers
                        </Box>
                        <Box as="a" href={'#'}>
                            Contact Us
                        </Box>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Support</ListHeader>
                        <Box as="a" href={'#'}>
                            Help Center
                        </Box>
                        <Box as="a" href={'#'}>
                            Safety Center
                        </Box>
                        <Box as="a" href={'#'}>
                            Community Guidelines
                        </Box>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Legal</ListHeader>
                        <Box as="a" href={'#'}>
                            Cookies Policy
                        </Box>
                        <Box as="a" href={'#'}>
                            Privacy Policy
                        </Box>
                        <Box as="a" href={'#'}>
                            Terms of Service
                        </Box>
                        <Box as="a" href={'#'}>
                            Law Enforcement
                        </Box>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Install App</ListHeader>
                    </Stack>
                </SimpleGrid>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ md: 'space-between' }}
                    align={{ md: 'center' }}
                >
                    <Text>© 2024 Quick Check. All rights reserved</Text>
                    <Stack direction={'row'} spacing={6}>
                        <Button height={"50px"} width={"50px"} padding={"0px"}>
                            <FaSquareXTwitter size="100%" />
                        </Button>
                        <Button height={"50px"} width={"50px"} padding={"0px"}>
                            <FaYoutube size="100%" />
                        </Button>
                        <Button height={"50px"} width={"50px"} padding={"0px"}>
                            <FaInstagram size="100%" />
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}

