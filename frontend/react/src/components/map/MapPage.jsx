import React, { useState, useRef } from "react";
import { GoogleMap, Marker, useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { Box, Input, VStack } from "@chakra-ui/react";

const apiKey = "AIzaSyB7sllsLey1ptbSmWNjgYINwhSgOkuQzW8"; // Replace with your actual API key
const libraries = ["places"];

export default function MapPage({ onMarkerSet }) {
    const [markerPosition, setMarkerPosition] = useState(null);
    const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default center
    const searchBoxRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    if (!isLoaded) return <div>Loading...</div>;

    const handlePlaceChanged = () => {
        const places = searchBoxRef.current.getPlaces();
        if (places.length === 0) return;

        const place = places[0];
        const location = place.geometry.location;
        const newCenter = { lat: location.lat(), lng: location.lng() };

        setCenter(newCenter);
        setMarkerPosition(newCenter);
        onMarkerSet(newCenter.lat, newCenter.lng); // Pass coordinates to parent when place is selected
    };

    return (
        <>
            <style>{`.pac-container { z-index: 2000 !important; }`}</style>
            <Box display="flex" justifyContent="center" alignItems="center" width="720px" height="550px" position="relative">
                <VStack>
                    <StandaloneSearchBox
                        onLoad={(ref) => (searchBoxRef.current = ref)}
                        onPlacesChanged={handlePlaceChanged}
                    >
                        <Input
                            type="text"
                            placeholder="Search for a place"
                            width="300px"
                            boxShadow="0 2px 6px rgba(0, 0, 0, 0.3)"
                            fontSize="16px"
                            backgroundColor="white"
                        />
                    </StandaloneSearchBox>

                    <Box width="720px" height="500px">
                        <GoogleMap
                            mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "10px" }}
                            zoom={12}
                            center={center}
                            onClick={(e) => {
                                const lat = e.latLng.lat();
                                const lng = e.latLng.lng();
                                setMarkerPosition({ lat, lng });
                                onMarkerSet(lat, lng); // Pass coordinates back to MapButton when clicking on map
                            }}
                        >
                            {markerPosition && <Marker position={markerPosition} />}
                        </GoogleMap>
                    </Box>
                </VStack>
            </Box>
        </>
    );
}
