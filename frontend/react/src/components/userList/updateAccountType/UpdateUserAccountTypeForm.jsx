import { Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Button,Stack} from "@chakra-ui/react";

import {updateUserAccountType} from "../../../services/client/users.js";
import {errorNotification, successNotification} from "../../../services/notification.js";
import MySelect from "../../shared/formFields/MySelect.jsx";


const UpdateUserForm = ({id,accountType, onSuccess}) => {

    const type = accountType[0]

    return (
        <>
            <Formik
                initialValues={{
                    accountType: type ,
                }}

                validationSchema={Yup.object({
                    accountType: Yup.string()
                        .oneOf(['USER', 'ADMIN'], 'Invalid account type')
                        .required('Required')
                })}

                onSubmit={(updatedAccountType, {setSubmitting}) => {
                    setSubmitting(true);
                    updateUserAccountType(id, updatedAccountType)
                        .then(res => {
                            successNotification(
                                "account type updated",
                                `successfully updated with id ${id}`
                            )
                            onSuccess();
                        })
                        .catch(err => {
                            errorNotification(
                                err.code,
                                err.response.data.message
                            )
                        })
                        .finally(() => {
                            setSubmitting(false);
                        })
                }}
            >
                {({isValid, isSubmitting, dirty}) => (
                    <Form>
                        <Stack spacing={"5px"}>
                            <MySelect label={"Account Type"} name="accountType">
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
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