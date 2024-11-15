'use client'

import {
    Box,
    Tooltip,
    Image, Button,

} from '@chakra-ui/react'
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";



const IMAGE =
    'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/18725/images/DAau3fjETFmAjLVaNl3B_FallLandscape7-.jpg'

export default function ClassCard({id,name}) {

    const navigate = useNavigate();

    const {name : orgName} = useParams();



    return (
        <Tooltip
            hasArrow // Adds an arrow to the tooltip
            placement={"right"} // Position the tooltip to the right
            label={name}
        >
            <Button
                padding={"0px"}
                rounded="lg"
                height="70px"
                width="70px"
                onClick={() => navigate(`/organization/${orgName}/class/${id}`)}
                // Changes the cursor to a pointer on hover
            >
                <Image
                    borderRadius={"20px"}
                    height="70px"
                    width="70px"
                    src={IMAGE}
                    alt={name}
                    objectFit="cover"
                />
            </Button>
        </Tooltip>
    )
}