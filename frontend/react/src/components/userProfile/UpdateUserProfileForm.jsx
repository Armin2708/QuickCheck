import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Button,Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {updateUser} from "../../services/client/users.js";
import MyTextInput from "../shared/formFields/MyText.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import MySelect from "../shared/formFields/MySelect.jsx";
import MyUserDropzone from "../shared/formFields/MyDropzone.jsx";

const UpdateUserProfileForm = ({id,name,address,email,dateOfBirth,gender}) => {

    const {fullUser} = useAuth();

    return (
        <>
            <MyUserDropzone userId={id}/>
            <Formik
                initialValues={{
                    name: name,
                    address: address,
                    email: email,
                    password: fullUser.password,
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
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .required('Required'),
                    dateOfBirth: Yup.date()
                        .required('Required'),
                    gender: Yup.string()
                        .oneOf(['MALE', 'FEMALE'], 'Invalid gender')
                        .required('Required'),
                })}

                onSubmit={(updatedProfile, {setSubmitting}) => {
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
                            <MyTextInput name="password" type="password" placeholder={fullUser.password} />
                            <MyTextInput name="dateOfBirth" type="date" placeholder={dateOfBirth} />
                            <MySelect name="gender" >
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

export default UpdateUserProfileForm;