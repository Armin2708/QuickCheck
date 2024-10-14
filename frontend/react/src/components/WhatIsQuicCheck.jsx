import {Box, Card, Text, Image, Stack, CardBody, Heading, CardFooter, Button} from "@chakra-ui/react";

export default function WhatIsQuicCheck(){
    return(
        <Box border={"1px"} borderColor={"gray.50"} borderRadius={"8px"}>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    objectFit='contain'
                    maxW={{ base: '100%', sm: '200px' }}
                    src='././quickchecklogo.png'
                    alt='Caffe Latte'
                />

                <Stack>
                    <CardBody>
                        <Heading size='md'>Attendance Best Friend !</Heading>

                        <Text py='2'>
                            QuickCheck is a simple, automated attendance tool <br/>
                            that makes it easy for students to check into their classes <br/>
                            using a mobile app or web browser. <br/>
                            No more manual roll calls! <br/>
                            QuickCheck connects directly with the university's system, <br/>
                            updating attendance records in real time.<br/>
                            Professors can quickly view attendance stats and reports,<br/>
                            while students enjoy a hassle-free way to mark their presence. <br/>
                            Fast, secure, and easy to use, <br/>
                            QuickCheck works on any device <br/>
                            and is perfect for large lecture halls where time is precious.<br/>
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                            Buy Latte
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </Box>
    )
}