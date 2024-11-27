'use client';

import {
    Box,
    Tooltip,
    Image,
    Button,
    Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {getClassroomById} from "../../../../services/client/classrooms.js";
import {getClassProfilePictureUrl} from "../../../../services/client/classes.js";

export default function ClassCard({ id, name, classroomId }) {
    const navigate = useNavigate();
    const [classroom,setClassroom] = useState({})
    const { name: orgName } = useParams();

    const defaultImage = "https://media.istockphoto.com/id/589985098/photo/los-angeles-skyline-by-night-california-usa.jpg?s=612x612&w=0&k=20&c=o8akFWVTSi6B9l3RbpwvAXlkaisy1aZy70qwi8Yj3Hw="


    const fetchClassroom = () =>{
        getClassroomById(classroomId)
            .then((res)=>{
                setClassroom(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    useEffect(() => {
        fetchClassroom()
    }, [classroomId]);

    return (
        <Tooltip
            hasArrow
            placement="right"
            label={classroom.roomName || ""} // Dynamically show tooltip content
        >
            <Button
                padding="0px"
                rounded="lg"
                onClick={() => navigate(`/dashboard/${orgName}/${id}`)}
                cursor="pointer"
                bg={"transparent"}
                paddingRight={"10px"}
                maxW={"200px"}
            >
                <Image
                    borderRadius="10px"
                    height="40px"
                    width="40px"
                    src={getClassProfilePictureUrl(id)}
                    fallbackSrc={defaultImage}

                    alt={name}
                    objectFit="cover"
                />
                <Text ml={2} isTruncated>{name}</Text> {/* Add some spacing between image and text */}
            </Button>
        </Tooltip>
    );
}