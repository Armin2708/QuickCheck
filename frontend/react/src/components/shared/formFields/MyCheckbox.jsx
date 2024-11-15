import {Field, useFormikContext} from "formik";
import {Checkbox, FormControl, FormLabel, HStack, Input} from "@chakra-ui/react";

export default function MyCheckbox({ label, ...props }) {
    const { values, setFieldValue } = useFormikContext();

    // This handler toggles the role in Formik's "roles" array.
    const handleCheckboxChange = (role) => {
        const currentRoles = values.roles || [];  // Ensure roles is an array
        const newRoles = currentRoles.includes(role)
            ? currentRoles.filter((r) => r !== role)
            : [...currentRoles, role];
        setFieldValue("roles", newRoles);
    };

    return (
        <FormControl>
            <FormLabel>Roles</FormLabel>
            <HStack spacing={5}>
                <div role="group" aria-labelledby="checkbox-group">
                        <Field type="checkbox" name="checked" value="One" />
                        One
                    <label>
                        <Field type="checkbox" name="checked" value="Two" />
                        Two
                    </label>
                    <label>
                        <Field type="checkbox" name="checked" value="Three" />
                        Three
                    </label>
                </div>
            </HStack>
        </FormControl>
    );
}
