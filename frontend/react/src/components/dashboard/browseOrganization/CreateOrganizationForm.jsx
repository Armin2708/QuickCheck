import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../../services/notification.js";
import {saveOrganizations} from "../../../services/client/organizations.js";
import MyTextInput from "../../shared/formFields/MyText.jsx";


// Register Form
const CreateOrganizationForm = ({onSuccess}) => {

    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(30, 'Must be 30 characters or less')
                    .required('Required'),
            })}
            onSubmit={async (organization, {setSubmitting}) => {
                setSubmitting(true);
                saveOrganizations(organization)
                    .then(res => {
                        console.log(res);
                        successNotification(
                            "Organization saved",
                            `${organization.name} was successfully saved`
                        )
                        onSuccess();
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
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Stack spacing={"4px"}>
                        <MyTextInput name="name" type="text" placeholder="Organization Name" />

                        <Stack direction={"row"} width={"100%"}>
                            <Button
                                type={"submit"}
                                disabled={!isValid || isSubmitting}
                                width={"100%"}
                                backgroundColor={"#7E3BB5"}
                                variant={'solid'}
                                textColor={"#FFFFFF"}
                                width={"100%"}
                            >
                                Create Organization
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default CreateOrganizationForm;