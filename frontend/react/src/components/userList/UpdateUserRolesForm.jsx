import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Text,Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {updateUserRoles} from "../../services/client/users.js";

const UpdateUserRolesForm = ({id,roles}) => {

    return (
        <>
            <Formik
                initialValues={{
                    roles: roles || []
            }}

                validationSchema={Yup.object({
                    roles: Yup.array().min(1, 'Select at least one role')
                })}

                onSubmit={(updatedProfile, {setSubmitting}) => {
                    setSubmitting(true);
                    updateUserRoles(id, updatedProfile)
                        .then(res => {
                            successNotification(
                                "User updated",
                                `roles were successfully updated`
                            )
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
                                    <Field type="checkbox" name="roles" value="USER"/>
                                    User
                                </Text>
                                <Text>
                                    <Field type="checkbox" name="roles" value="INSTRUCTOR"/>
                                    Instructor
                                </Text>
                                <Text>
                                    <Field type="checkbox" name="roles" value="ADMIN"/>
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