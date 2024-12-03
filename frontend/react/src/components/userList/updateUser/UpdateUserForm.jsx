import { Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Button,Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../../services/notification.js";
import {updateUser} from "../../../services/client/users.js";
import MyTextInput from "../../shared/formFields/MyText.jsx";
import MySelect from "../../shared/formFields/MySelect.jsx";


const UpdateUserForm = ({id,name,address,email,dateOfBirth,gender}) => {

    return (
        <>
            <Formik
                initialValues={{
                    name: name,
                    address: address,
                    email: email,
                    password: null,
                    dateOfBirth: dateOfBirth,
                    gender: gender
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
                        .required('Required')
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
                            <MyTextInput label={"Name"} name="name" type="text" placeholder={name} />
                            <MyTextInput label={"Address"} name="address" type="text" placeholder={address} />
                            <MyTextInput label={"Date of birth"} name="dateOfBirth" type="date" placeholder={dateOfBirth} />
                            <MySelect label={"Gender"} name="gender" >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </MySelect>


                            <Button disabled={!(isValid && dirty) || isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default UpdateUserForm;