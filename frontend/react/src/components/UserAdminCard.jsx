import {
    Button,
    Text,
    Image,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Stack,
} from "@chakra-ui/react";

export default function UserAdminCard({schoolName,name,email}){
    return(
        <Card maxW='sm'>
            <CardBody>
                <Image
                    width={200}
                    height={200}
                    src={"././defaultAvatar.png"}
                    alt={"avatar"}
                    borderRadius="full"
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{schoolName}</Heading>
                    <Text>
                        {email}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        {name}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                        Edit
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Delete
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}