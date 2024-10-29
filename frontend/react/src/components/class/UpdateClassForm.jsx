import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {errorNotification, successNotification} from "../../services/notification.js";
import {updateClass, updateClassroom} from "../../services/client.js";
import MyTextInput from "../shared/form/MyText.jsx";


// And now we can use these
const UpdateClassForm = ({id,name, startDate, endDate, professorId, classroomId}) => {
    return (
        <>
            <Formik
                initialValues={{
                    name: name,
                    startDate: startDate,
                    endDate: endDate,
                    professorId: professorId,
                    classroomId: classroomId
            }}

                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .required('Required'),
                    professorId: Yup.number()
                        .required('Required'),
                    startDate: Yup.date().required('Required'),
                    endDate: Yup.date().required('Required'),
                })}

                onSubmit={(updatedClass, {setSubmitting}) => {
                    setSubmitting(true);
                    updateClass(id, updatedClass)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "Class updated",
                                `${updatedClass.name} was successfully updated with id ${id}`
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
                        <Stack spacing={"24px"}>
                            <MyTextInput name="name" type="text" placeholder={name}/>
                            <MyTextInput name="professorId" type="number" placeholder={professorId}/>
                            <MyTextInput name="startDate" type="date" placeholder={startDate} />
                            <MyTextInput name="endDate" type="date" placeholder={endDate} />

                            <Button disabled={!(isValid && dirty) || isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default UpdateClassForm;