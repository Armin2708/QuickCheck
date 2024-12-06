 import React, {useEffect, useState} from "react";
    import {GoogleMap, LoadScript, LoadScriptNext, Marker, MarkerF} from "@react-google-maps/api";

    export default function MiniMap({ latitude, longitude, apiKey }) {


        const mapContainerStyle = {
            width: "100%",
            height: "250px", // Adjust map size
        };

        const center = {
            lat: latitude,
            lng: longitude,
        };



        return (
            <LoadScriptNext googleMapsApiKey={`${apiKey}`} libraries={['places', 'marker']} >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                    options={{
                        gestureHandling: "auto", // Enable panning with the cursor
                        disableDefaultUI: false, // Allow some default UI
                        zoomControl: true, // Enable zoom buttons
                        mapTypeControl: false, // Disable Map/Satellite button
                        streetViewControl: false, // Disable the Street View button
                    }}
                >
                    <MarkerF position={center}/>
                </GoogleMap>
            </LoadScriptNext>
        );
}