import {Field, Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, Text,Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {updateUser} from "../../services/client.js";
import MyTextInput from "../shared/form/MyText.jsx";
import MySelect from "../shared/form/MySelect.jsx";
import MyCheckbox from "../shared/form/MyCheckbox.jsx";



// And now we can use these
const UpdateUserProfileForm = ({id,name,address,email,dateOfBirth,gender,roles}) => {

    console.log(roles)
    return (
        <>
            <Formik
                initialValues={{
                    name: name,
                    address: address,
                    email: email,
                    password: null,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    roles: roles || []
            }}

                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .required('Required'),
                    address: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .required('Required'),
                    dateOfBirth: Yup.date()
                        .required('Required'),
                    gender: Yup.string()
                        .oneOf(['MALE', 'FEMALE'], 'Invalid gender')
                        .required('Required'),
                    roles: Yup.array().min(1, 'Select at least one role')
                })}

                onSubmit={(updatedProfile, {setSubmitting}) => {
                    console.log(updatedProfile)
                    setSubmitting(false)
                    setSubmitting(true);
                    updateUser(id, updatedProfile)
                        .then(res => {
                            successNotification(
                                "User updated",
                                `${updatedProfile.name} was successfully updated with id ${id}`
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
                            <MyTextInput name="name" type="text" placeholder={name}/>
                            <MyTextInput name="address" type="text" placeholder={address}/>
                            <MyTextInput name="dateOfBirth" type="date" placeholder={dateOfBirth} />
                            <MySelect name="gender" >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </MySelect>
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

export default UpdateUserProfileForm;