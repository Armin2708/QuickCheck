import {useField} from "formik";
import {Alert, AlertIcon, Box, FormLabel, Input} from "@chakra-ui/react";

export default function MyTextInput({ label, ...props }){
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input {...field} {...props} />
            {meta.touched && meta.error && (
                <Alert status="error" mt={2}><AlertIcon />{meta.error}</Alert>
            )}
        </Box>
    );
};