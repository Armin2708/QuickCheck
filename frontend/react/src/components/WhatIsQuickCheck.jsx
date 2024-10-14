import {
    Box,
    Card,
    Text,
    Image,
    Stack,
    CardBody,
    Heading,
    CardFooter,
    Button,
    SimpleGrid,
    CardHeader, Divider
} from "@chakra-ui/react";



export default function WhatIsQuickCheck(){
    return(
        <SimpleGrid spacing={4} templateColumns='repeat(4, 1fr)'>
            <CustomCard
                heading={"QuickCheck is a simple"}
                text={"Automated attendance tool that makes it easy for students to check into their classes using a mobile app or web browser"}
            />
            <CustomCard
                heading={"No more manual roll calls!"}
                text={"QuickCheck connects directly with the university's system, updating attendance records in real time"}
            />

            <CustomCard
                heading={"Quickly check attendance stats"}
                text={"Professor and students enjoy a hassle-free way to mark their presence and consult it"}
            />
            <CustomCard
                heading={"Fast, secure, and easy to use"}
                text={"QuickCheck works on any device and is perfect for large lecture halls where time is precious"}
            />
        </SimpleGrid>
    )
}
function CustomCard({heading,text}){
    return(
        <Card maxW={"250px"} borderRadius={"15px"}>
            <CardHeader>
                <Heading size='md'> {heading}</Heading>
            </CardHeader>
            <Box my={4} mx={4}> {/* Margin of 4px on all sides */}
                <Divider borderColor="black" />
            </Box>
            <CardBody>
                <Text>{text}</Text>
            </CardBody>
            <CardFooter>
                {/*<Button>View here</Button>*/}
            </CardFooter>
        </Card>
    )
}