'use client'

import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button,
} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {getClassrooms, getUserById, leaveClass, leaveOrganization} from "../../services/client.js";
import {useNavigate} from "react-router-dom";
import {errorNotification, successNotification} from "../../services/notification.js";


const IMAGE =
    'https://media.istockphoto.com/id/1349030917/photo/business-and-finance-looking-up-at-high-rise-office-buildings-in-the-financial-district-of-a.jpg?s=612x612&w=0&k=20&c=NSnN0va-f1OBG_GA7bTVmUIoBwNDKUXtHD8_PzeTNiA='

export default function OrganizationCard({id,name, onSuccess,fullUser}) {

    const navigate = useNavigate();

    const handleLeaveOrg = () =>{
        leaveOrganization(fullUser.id,id)
            .then(() => {
                successNotification(
                    "Class Left",
                    `${name} was successfully Left`
                );
                onSuccess()
            })
            .catch((err) => {
                errorNotification(
                    err.code,
                    err.response?.data?.message
                )
            })

    }

    return (
        <Center py={12}>
            <Box
                width={"100%"}
                height={"100%"}
                background={"transparent"}
                cursor="pointer"
                _hover={{
                    transform: "scale(1.05)", // Scale up slightly on hover
                    transition: "transform 0.2s ease-in-out" // Smooth transition effect
                }}
                onClick={() => navigate(`/organization/${name}`)}
            >
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                >
                    <Box
                        rounded={'lg'}
                        mt={-12}
                        pos={'relative'}
                        height={'230px'}
                        _after={{
                            transition: 'all .3s ease',
                            content: '""',
                            w: 'full',
                            h: 'full',
                            pos: 'absolute',
                            top: 5,
                            left: 0,
                            backgroundImage: `url(${IMAGE})`,
                            filter: 'blur(15px)',
                            zIndex: -1,
                        }}
                        _groupHover={{
                            _after: {
                                filter: 'blur(20px)',
                            },
                        }}
                    >
                        <Image
                            rounded={'lg'}
                            height={230}
                            width={282}
                            objectFit={'cover'}
                            src={IMAGE}
                            alt="#"
                        />
                    </Box>
                    <Stack pt={10} align={'center'}>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            {name}
                        </Heading>
                        <Button
                            fontWeight={800}
                            fontSize={'xl'}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent click from propagating to the outer Box
                                handleLeaveOrg();
                            }}
                        >
                            Leave
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Center>
    );
}