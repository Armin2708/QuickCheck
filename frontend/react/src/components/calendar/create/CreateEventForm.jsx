import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Button, Heading, Stack, Text, HStack, Input } from '@chakra-ui/react';
import MyTextInput from "../../shared/formFields/MyText.jsx";
import MyDateTimeSelect from "../../shared/formFields/MyDateTimeSelect.jsx";
import {saveEvent} from "../../../services/client/calendarEvent.js";
import {errorNotification, successNotification} from "../../../services/notification.js";

export default function CreateEventForm({ selectedDate, onSuccess, fullUser, classId }){

    const saveNewEvent = (event) =>{
        saveEvent(event)
            .then(() =>{
                successNotification("Success", "Event Saved Successfully")
                onSuccess()
            })
            .catch((err) =>{
                errorNotification(
                    err.code,
                    err.response?.data?.message
                )
            })
    }

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                start: '',
                end: '',
            }}

            validationSchema={
            Yup.object({
                title: Yup.string().max(30, 'Must be 30 characters or less').required('Please enter a valid name.'),
                description: Yup.string().max(100, 'Must be 100 characters or less'),
                start: Yup.string().required('Please enter a valid start time.'),
                end: Yup.string().required('Please enter a valid end time.'),
            })}

            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);

                // Parse the hours and minutes from the time strings
                const [startHours, startMinutes] = values.start.split(":").map(Number);
                const [endHours, endMinutes] = values.end.split(":").map(Number);

                // Create new Date objects for start and end based on selectedDate
                const startDateTime = new Date(`${selectedDate}T00:00:00`); // Local midnight
                startDateTime.setHours(startHours, startMinutes, 0, 0); // Set hours, minutes, seconds, milliseconds

                const endDateTime = new Date(`${selectedDate}T00:00:00`); // Local midnight
                endDateTime.setHours(endHours, endMinutes, 0, 0);

                const eventClassId = classId ? classId : null

                console.log(eventClassId)

                const event = {
                    title: values.title,
                    description: values.description,
                    start: startDateTime.toISOString(), // Convert to ISO string
                    end: endDateTime.toISOString(), // Convert to ISO string,
                    creatorId: fullUser.id,
                    classId: eventClassId
                };

                saveNewEvent(event);


                setSubmitting(false);
            }}
        >
            {({ isValid, isSubmitting, values, handleChange }) => (
                <Form noValidate>
                    <Box borderWidth="1px" rounded="lg" borderColor="white" maxWidth={600} p={6} m="10px auto">
                        <Stack spacing="4px">

                            <MyTextInput label={"Name"} name={"title"} type={"text"} placeholder={"Event Name"}/>
                            <MyTextInput label={"Description"} name={"description"} type={"text"} placeholder={"Description"}/>

                            <HStack spacing="4px">
                                <MyDateTimeSelect label={"Start"} name={"start"} type={"time"}/>
                                <MyDateTimeSelect label={"End"} name={"end"} type={"time"}/>
                            </HStack>
                        </Stack>
                        <Stack mt={8}>
                            <HStack justifyContent="center">
                                <Button w="7rem" backgroundColor="gray.700" color="white" borderColor="white"
                                        variant="solid" isLoading={isSubmitting} type="submit"
                                        isDisabled={!isValid || isSubmitting} _hover={{ backgroundColor: "gray.600" }}>
                                    Submit
                                </Button>
                                {/*<Button w="7rem" backgroundColor="gray.700" color="white" borderColor="white" variant="solid" onClick={onClose} _hover={{ backgroundColor: "gray.600" }}>
                                    Cancel
                                </Button>*/}
                            </HStack>
                        </Stack>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
