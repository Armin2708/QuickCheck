import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Button, Heading, Stack, Text, HStack, Input } from '@chakra-ui/react';
import MyTextInput from "../../shared/formFields/MyText.jsx";
import MyDateTimeSelect from "../../shared/formFields/MyDateTimeSelect.jsx";
import {updateEvent} from "../../../services/client/calendarEvent.js";
import {errorNotification, successNotification} from "../../../services/notification.js";

export default function UpdateEventForm({ selectedEvent, onSuccess }){
    const formatToHHMM = (date) => {
        if (!date) return ''; // Handle null or undefined
        const d = new Date(date);
        const hours = d.getHours().toString().padStart(2, '0'); // Ensure two digits
        const minutes = d.getMinutes().toString().padStart(2, '0'); // Ensure two digits
        return `${hours}:${minutes}`;
    };

    const updateSelectedEvent = (eventId,update) =>{
        updateEvent(eventId,update)
            .then(() =>{
                successNotification("Update Success", "Event updated successfully");
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
            // Initial values
            initialValues={{
                title: selectedEvent?.title || '',
                description: selectedEvent?.description,
                start: selectedEvent?.start ? formatToHHMM(selectedEvent.start) : '',
                end: selectedEvent?.end ? formatToHHMM(selectedEvent.end) : '',
            }}

            validationSchema={
                Yup.object({
                    title: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .required('Please enter a valid name.'),
                    description: Yup.string()
                        .max(100, 'Must be 30 characters or less')
                        .required('Please enter a valid name.'),
                    start: Yup.string()
                        .required('Please enter a valid start time.'),
                    end: Yup.string()
                        .required('Please enter a valid end time.'),
                })
            }

            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);

                // Parse the hours and minutes from the time strings
                const [startHours, startMinutes] = values.start.split(":").map(Number);
                const [endHours, endMinutes] = values.end.split(":").map(Number);

                // Create new Date objects for start and end based on selectedDate
                const startDate = new Date(selectedEvent.start);
                const endDate = new Date(selectedEvent.end);

                // Update hours and minutes for start and end
                startDate.setHours(startHours, startMinutes, 0, 0);
                endDate.setHours(endHours, endMinutes, 0, 0);

                const event = {
                    title: values.title,
                    description: values.description,
                    start: startDate.toISOString(), // Convert to ISO string if needed
                    end: endDate.toISOString(),     // Convert to ISO string if needed
                };

                updateSelectedEvent(selectedEvent.id, event);
                setSubmitting(false);
            }}
        >
            {({ isValid, isSubmitting, values, handleChange }) => (
                <Form noValidate>
                    <Box borderWidth="1px" rounded="lg" borderColor="white" maxWidth={600} p={6} m="10px auto" >
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
                            </HStack>
                        </Stack>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
