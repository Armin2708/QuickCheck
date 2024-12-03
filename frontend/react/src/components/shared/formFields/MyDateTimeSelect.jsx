import {Alert, AlertIcon, Box, FormLabel, Input, Text} from "@chakra-ui/react";
import {ErrorMessage, Field, useField} from "formik";
import React from "react";

export default function MyDateTimeSelect({ label, ...props }){
    const [field, meta] = useField(props);
    return(
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input {...field} {...props}/>
            {meta.touched && meta.error && (
                <Alert status="error" mt={2}><AlertIcon />{meta.error}</Alert>
            )}
        </Box>
    )
}