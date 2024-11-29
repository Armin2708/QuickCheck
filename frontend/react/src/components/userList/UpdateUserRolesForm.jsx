import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Text,Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {updateUserRoles} from "../../services/client/role.js";

const UpdateUserRolesForm = ({userId,organizationName,roles, onSuccess}) => {
    const initialRoles = roles.map((role) => role.roleTitle);

    return (
        <>
            <Formik
                initialValues={{
                    roles: initialRoles || []
            }}

                validationSchema={Yup.object({
                    roles: Yup.array()
                })}

                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);

                    const payload = {
                        roles : values.roles,
                        organizationName : organizationName
                    }

                    updateUserRoles(userId,payload)
                        .then(res => {
                            successNotification(
                                "User updated",
                                `roles were successfully updated`
                            )
                            onSuccess()
                        }).catch(err => {
                        console.log(err);
                        errorNotification(
                            err.code,
                            err.response.data.message
                        )
                    }).finally(() => {
                        setSubmitting(false);
                    })
                }}
            >
                {({isValid, isSubmitting, dirty}) => (
                    <Form>
                        <Stack spacing={"5px"}>
                            <Box >
                                <Text>
                                    <Field type="checkbox" name="roles" value="INSTRUCTOR"/>
                                    Instructor
                                </Text>
                                <Text>
                                    <Field type="checkbox" name="roles" value="MANAGER"/>
                                    Admin
                                </Text>
                            </Box>


                            <Button disabled={!(isValid && dirty) || isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default UpdateUserRolesForm;