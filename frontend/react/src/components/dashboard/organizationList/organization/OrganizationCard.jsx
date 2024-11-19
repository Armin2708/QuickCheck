import {
    Box,
    Text,
    HStack,
} from '@chakra-ui/react'

import {HiOutlineBuildingOffice2} from "react-icons/hi2";

export default function OrganizationCard({name}) {

    return (
        <Box
            padding={"5px"}
            width={"150px"}

        >
            <HStack spacing={"10px"} >
                <HiOutlineBuildingOffice2 size={"30px"} />
                <Text
                    fontSize="lg"
                    fontFamily="body"
                    fontWeight={"bold"}
                    noOfLines={1} // Ensures truncation for long text
                    isTruncated
                >
                    {name}
                </Text>
            </HStack>
        </Box>
    );
}