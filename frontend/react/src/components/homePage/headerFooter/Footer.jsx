import React from 'react';
import { Box, Text, Stack, Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import {FaSquareXTwitter} from "react-icons/fa6";

const Footer = () => {
    return (
        <Box
            as="footer"
            position="relative"
            bottom="0"
            width="100%"
            borderTopWidth={1}
            borderStyle="solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            padding="40px"
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Flex
                direction={{ base: 'column', md: 'row' }} // Column on mobile, row on larger screens
                align="center"
                justify="space-between"
                wrap="wrap"
            >
                <Text mb={{ base: '20px', md: '0' }}>© 2024 Quick Check. All rights reserved</Text>

                <Stack align="flex-start" direction={{ base: 'column', md: 'row' }} spacing={{ base: '10px', md: '40px' }}>
                    <Box as="a" href="#">About Us</Box>
                    <Box as="a" href="#">Contact Us</Box>
                    <Box as="a" href="#">Privacy Policy</Box>
                    <Box as="a" href="#">Terms of Service</Box>
                    <Box>Install App</Box>
                </Stack>

                <Stack direction="row" spacing={6} mt={{ base: '20px', md: '0' }}>
                    <Button height="50px" width="50px" padding="0px">
                        <FaSquareXTwitter size="100%" />
                    </Button>
                    <Button height="50px" width="50px" padding="0px">
                        <FaYoutube size="100%" />
                    </Button>
                    <Button height="50px" width="50px" padding="0px">
                        <FaInstagram size="100%" />
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
};

export default Footer;
