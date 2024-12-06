import React, {useEffect, useState} from 'react';
import { Text, Link } from '@chakra-ui/react';

export default function MapLink({latitude, longitude, apiKey}){

    const [address, setAddress] = useState("");

    const fetchAddress = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === "OK") {
                setAddress(data.results[0]?.formatted_address || "Address not found");
            } else {
                console.error("Geocoding error:", data.status);
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };

    useEffect(() => {
        if (latitude && longitude){
            fetchAddress();
        }
    }, [latitude,longitude]);

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

        return (
            <Text fontSize={'md'}>
                <Link
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="blue.500" // Optional: Style for link
                    ml={1} // Add margin between "Location:" and the link
                >
                    {address}
                </Link>
            </Text>
        );
}