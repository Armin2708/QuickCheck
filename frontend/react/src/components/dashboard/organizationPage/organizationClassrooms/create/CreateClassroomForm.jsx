import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import {
    Box, Button,
} from '@chakra-ui/react';
import {saveClassroom} from "../../../../../services/client/classrooms.js";
import {errorNotification, successNotification} from "../../../../../services/notification.js";
import MapButton from "../../../../shared/map/MapButton.jsx";
import MyTextInput from "../../../../shared/formFields/MyText.jsx";


// Multi-Step Form Component
export default function CreateClassroomForm({ organizationId, onSuccess}) {

    return (
        <Formik
            initialValues={{
                roomName: '',
                location: '',
                capacity: '',
            }}
            validationSchema={Yup.object({
                roomName:
                    Yup.string().max(30, 'Must be 30 characters or less').required("Required"),
                location:
                    Yup.string().max(1000, 'Must be 1000 characters or less').required("Required"),
                capacity:
                    Yup.number().required('Required')
            })
            }
            onSubmit={(values, {setSubmitting}) => {

                setSubmitting(true);

                const classroomData = {
                    roomName: values.roomName,
                    location: values.location,
                    capacity: values.capacity,
                    organizationId: organizationId
                };

                    saveClassroom(classroomData)
                        .then(() =>{
                            successNotification(
                                "Classroom saved",
                                `${classroomData.roomName} was successfully saved`
                            );
                            onSuccess();
                        })
                        .catch((err) =>{
                            errorNotification(
                                err.code,
                                err.response?.data?.message
                            );
                        })
                        .finally(setSubmitting(false))
            }}


        >
            {({ isValid, isSubmitting, setFieldValue, values }) => (
                <Form>
                    <Box borderWidth="1px" rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" maxWidth={600} p={6} m="10px auto">

                        <MapButton onLocationSelect={(lat, lng) => {
                            setFieldValue("location", `${lat}, ${lng}`);
                        }}/>
                        <MyTextInput name="roomName" type="text" placeholder="Room Name" />
                        <MyTextInput name="capacity" type="number" placeholder="Class Capacity" />
                        <Button w="7rem" colorScheme="red" variant="solid" isLoading={isSubmitting} type="submit" isDisabled={!isValid || isSubmitting}>
                            Submit
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
