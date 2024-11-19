import {Box, Button, Spinner, Text, useToast} from "@chakra-ui/react";
import isWithinDistance from "./locationDistanceCalculator.js";
import React, {useState} from "react";

export default function LocationButton({disabled,classroomLocation,validRadius,setIsLocationValid}){
    const [isLoading, setIsLoading] = useState(false);
    const toast= useToast();


    const getUserLocation = async () => {
        if ('geolocation' in navigator) {
            try {
                setIsLoading(true);
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const userLocation = `${latitude},${longitude}`;

                // Call your function here after getting the user location
                const isWithin = isWithinDistance(classroomLocation, userLocation, validRadius);
                setIsLoading(false);
                if (isWithin){
                    setIsLocationValid(true);
                    toast({
                        title: "Valid Location",
                        description: "Location Verified",
                        status: "success",
                        duration: 5000, // 5 seconds
                        isClosable: true,
                    });
                }
                else {
                    setIsLocationValid(false);
                    // Show notification if location is invalid
                    toast({
                        title: "Invalid Location",
                        description: "You are not within the valid range to mark attendance.",
                        status: "error",
                        duration: 5000, // 5 seconds
                        isClosable: true,
                    });
                }

            } catch (error) {
                console.error("Error getting location:", error.code);
                setIsLoading(false)
            }
        } else {
            console.log("Geolocation Not Supported");
        }
    };

    return(
        <Box>
            <Button
                paddingX="18px"
                paddingY="7px"
                borderRadius="8px"
                width="180px"
                height="38px"
                background="#7E3BB5"
                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                fontWeight="medium"
                fontSize="20px"
                textAlign="center"
                disabled={disabled||isLoading}
                onClick={getUserLocation}
                color={"white"}
            >
                {disabled ? (
                    <Text>
                        Valid Location
                    </Text>
                ) : isLoading ? (
                    <Spinner />
                ) : (
                    <Text>
                        Verify Location
                    </Text>
                )}
            </Button>
        </Box>
    )
}