import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import { errorNotification, successNotification } from "../../../services/notification.js";
import { useState, useEffect } from "react";
import {
    Box, Button, ButtonGroup, Checkbox, Flex,
    Heading, Input, Select, Stack, Progress,
} from '@chakra-ui/react';
import MySelect from "../../shared/formFields/MySelect.jsx";
import MyTextInput from "../../shared/formFields/MyText.jsx";
import MapButton from "../../shared/map/MapButton.jsx";
import {
    getClassroomByNameAndOrganization,
    getOrganizationClassrooms,
    saveClassroom
} from "../../../services/client/classrooms.js";
import {saveClass} from "../../../services/client/classes.js";

// Multi-Step Form Component
export default function CreateClassForm({fullUser, organizationName, organizationId}) {
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(50);
    const [existClassroom, setExistingClassroom] = useState(false);
    const [classrooms,setClassrooms] = useState([])

    const fetchClassrooms = () => {
        getOrganizationClassrooms(organizationId)
            .then((res) => {
                setClassrooms(res.data);
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            });
    };

    useEffect(() => {
        if (organizationId){
            fetchClassrooms()
        }
    }, [organizationId]);

    return (
        <Formik
            initialValues={{
                name: '',
                professorId: fullUser.id,
                startDate: '',
                endDate: '',
                classroomId: '',

                roomName: '',
                location: '',
                capacity: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
                professorId: Yup.number().required('Required'),
                startDate: Yup.date().required('Required'),
                endDate: Yup.date().required('Required'),
                classroomId: Yup.number(),

                roomName: existClassroom?
                    Yup.string().max(30, 'Must be 30 characters or less') :
                    Yup.string().max(30, 'Must be 30 characters or less').required("Required"),
                location: existClassroom?
                    Yup.string().max(1000, 'Must be 1000 characters or less') :
                    Yup.string().max(1000, 'Must be 1000 characters or less').required("Required"),
                capacity: existClassroom?
                    Yup.number() :
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
                const classData = {
                    name: values.name,
                    professorId: values.professorId,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    organizationName: organizationName
                };

                if (values.classroomId !== '') {
                    // Use existing classroom
                    classData.classroomId = values.classroomId;
                    saveClass(classData)
                        .then(() => {
                            successNotification(
                                "Class saved",
                                `${values.name} was successfully saved with existing classroom`
                            );
                        })
                        .catch((err) => {
                            errorNotification(
                                err.code,
                                err.response?.data?.message
                            );
                        })
                        .finally(setSubmitting(false));
                }
                else {
                    saveClassroom(classroomData)
                        .then(() =>{
                            successNotification(
                                "Classroom saved",
                                `${classroomData.roomName} was successfully saved`
                            );

                            getClassroomByNameAndOrganization(classroomData.roomName, classroomData.organizationId)
                                .then((res) => {
                                    classData.classroomId = res.data.id;

                                    // Save the class with the assigned classroom ID
                                    saveClass(classData)
                                        .then(() =>{
                                            successNotification(
                                                "Class saved",
                                                `${classData.name} was successfully saved`
                                            );
                                        })
                                        .catch((err) =>{
                                            errorNotification(
                                                err.code,
                                                err.response?.data?.message
                                            );
                                        })

                                })
                                .catch((err) =>{
                                    console.log(err)
                                })

                        })
                        .catch((err) =>{
                            errorNotification(
                                err.code,
                                err.response?.data?.message
                            );
                        })
                        .finally(setSubmitting(false))
                }
            }}


        >
            {({ isValid, isSubmitting, setFieldValue, values }) => (
                <Form>
                    <Box borderWidth="1px" rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" maxWidth={600} p={6} m="10px auto">
                        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated borderRadius={"3px"} colorScheme={"pink"}/>
                        {step === 1 ? (
                            <>
                                <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">Create Class</Heading>
                                <Stack spacing="4px">
                                    <MyTextInput name="name" type="text" placeholder="Class Name" />
                                    <MyTextInput name="professorId" type="text" placeholder="Professor Id" />
                                    <Stack direction="row">
                                        <MyTextInput name="startDate" type="date" placeholder="Start Date" />
                                        <MyTextInput name="endDate" type="date" placeholder="End Date" />
                                    </Stack>
                                </Stack>
                            </>
                        ) : (
                            <>
                                <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">Add Classroom Details</Heading>
                                <Checkbox
                                    isChecked={existClassroom}
                                    onChange={() => {
                                        setFieldValue("classroomId", ""); // Reset values when toggling
                                        setFieldValue("roomName", "");
                                        setFieldValue("location", "");
                                        setFieldValue("capacity", "");
                                        setExistingClassroom(!existClassroom)
                                    }}
                                >
                                    Select Existing Classroom
                                </Checkbox>

                                {existClassroom ? (
                                    <MySelect name="classroomId" placeholder="Select Classroom">
                                        {classrooms?.map((classroom) => (
                                            <option key={classroom.id} value={classroom.id}>
                                                {classroom.name}
                                            </option>
                                        ))}
                                    </MySelect>
                                ) : (
                                    <>
                                        <MapButton onLocationSelect={(lat, lng) => {
                                            setFieldValue("location", `${lat}, ${lng}`);
                                        }}/>
                                        <MyTextInput name="roomName" type="text" placeholder="Room Name" />
                                        <MyTextInput name="capacity" type="number" placeholder="Class Capacity" />
                                    </>
                                )}
                            </>
                        )}
                        <ButtonGroup mt="5%" w="100%">
                            <Flex w="100%" justifyContent="space-between">
                                <Button
                                    onClick={() => {
                                        setStep(step - 1);
                                        setProgress(progress - 50);
                                    }}
                                    isDisabled={step === 1}
                                    backgroundColor="#7E3BB5"
                                    color={"white"}
                                    variant="solid"
                                    w="7rem"
                                    mr="5%"
                                >
                                    Back
                                </Button>
                                {step === 2 ? (
                                    <Button w="7rem" colorScheme="red" variant="solid" isLoading={isSubmitting} type="submit" isDisabled={!isValid || isSubmitting}>
                                        Submit
                                    </Button>
                                ) : (
                                    <Button
                                        w="7rem"
                                        isDisabled={step === 2}
                                        onClick={() => {
                                            setStep(step + 1);
                                            setProgress(100);
                                        }}
                                        color="#7E3BB5"
                                        variant="outline"
                                        borderColor={"#7E3BB5"}
                                    >
                                        Next
                                    </Button>
                                )}
                            </Flex>
                        </ButtonGroup>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
