import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import { updateOrganizationEvent } from "../../../../../services/client/organizationEvent.js";
import { errorNotification, successNotification } from "../../../../../services/notification.js";
import MyTextInput from "../../../../shared/formFields/MyText.jsx";
import MyDateTimeSelect from "../../../../shared/formFields/MyDateTimeSelect.jsx";
import React from "react";

export default function UpdateOrganizationEventForm({ event, onSuccess }) {
    // Format the dateTime to match the `datetime-local` input field
    const formattedDateTime = event?.dateTime
        ? new Date(event.dateTime).toISOString().slice(0, 16)
        : "";

    return (
        <Formik
            initialValues={{
                name: event?.name,
                location: event?.location,
                description: event?.description,
                dateTime: formattedDateTime,
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(30, "Must be 30 characters or less")
                    .required("Please enter a valid name."),
                dateTime: Yup.string().required("Please enter a valid start time."),
                location: Yup.string().max(100, "Must be 100 characters or less"),
                description: Yup.string().max(100, "Must be 100 characters or less"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);

                const isoDateTime = new Date(values.dateTime).toISOString();


                const update = {
                    name: values?.name,
                    dateTime: isoDateTime,
                    location: values?.location,
                    description: values?.description,
                };


                updateOrganizationEvent(event?.id, update)
                    .then(() => {
                        successNotification("Update Success", "Event updated successfully!");
                        onSuccess();
                    })
                    .catch((err) => {
                        errorNotification(err.code, err.response?.data?.message);
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }}
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Box borderWidth="1px" rounded="lg" borderColor="white" maxWidth={600} p={6} m="10px auto">
                        <Stack spacing="4px">
                            <MyTextInput label={"Name"} name={"name"} type={"text"} placeholder={"Event name"} />
                            <MyDateTimeSelect label={"Date Time"} name={"dateTime"} type={"datetime-local"} />
                            <MyTextInput label={"Location"} name={"location"} type={"text"} placeholder={"Event location"} />
                            <MyTextInput label={"Description"} name={"description"} type={"text"} placeholder={"Description"} />
                        </Stack>
                        <Stack mt={8}>
                            <HStack justifyContent="center">
                                <Button
                                    w="7rem"
                                    backgroundColor="gray.700"
                                    color="white"
                                    borderColor="white"
                                    variant="solid"
                                    isLoading={isSubmitting}
                                    type="submit"
                                    isDisabled={!isValid || isSubmitting}
                                    _hover={{ backgroundColor: "gray.600" }}
                                >
                                    Submit
                                </Button>
                            </HStack>
                        </Stack>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}