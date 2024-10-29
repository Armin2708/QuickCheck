import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import { useToast } from '@chakra-ui/react';
import {getClassroomByName, getClassrooms, saveClass, saveClassroom} from "../../services/client.js";
import { errorNotification, successNotification } from "../../services/notification.js";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
    Box, Button, ButtonGroup, Checkbox, Flex, FormLabel, Heading, Input, Select, Stack, Progress, Alert, AlertIcon
} from '@chakra-ui/react';
import MySelect from "../shared/form/MySelect.jsx";
import MyTextInput from "../shared/form/MyText.jsx";
import {useParams} from "react-router-dom";

// Multi-Step Form Component
export default function CreateClassForm() {
    const toast = useToast();
    const { fullUser } = useAuth();
    const { name: organizationName } = useParams();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(50);
    const [existClassroom, setExistingClassroom] = useState(false);
    const [classrooms,setClassrooms] = useState([])
    const [classroom,setClassroom] = useState({})



    const fetchClassrooms = () => {
        getClassrooms()
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setClassrooms(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            });
    };

    useEffect(() => {
        fetchClassrooms()
    }, []);

    return (
        <Formik
            initialValues={{
                name: '',
                professorId: fullUser.id,
                startDate: '',
                endDate: '',
                classroomId: '',
                organizationName: organizationName,

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
            onSubmit={async (values, actions) => {
                const classroomData = {
                    roomName: values.roomName,
                    location: values.location,
                    capacity: values.capacity
                };
                const classData = {
                    name: values.name,
                    professorId: values.professorId,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    organizationName:values.organizationName
                };

                if (values.classroomId !== '') {
                    // Use existing classroom
                    classData.classroomId = values.classroomId;
                    saveClass(classData)
                        .then(() => {
                            successNotification("Class saved", `${values.name} was successfully saved with existing classroom`);
                            toast({
                                title: 'Class created.',
                                description: `${values.name} has been created successfully.`,
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                            });
                        })
                        .catch((err) => errorNotification(err.code, err.response?.data?.message))
                        .finally(() => actions.setSubmitting(false));
                } else {
                    // Create new classroom first
                    try {
                        // Save the classroom first
                        const classroomRes = await saveClassroom(classroomData);
                        console.log(classroomRes);
                        successNotification(
                            "Classroom saved",
                            `${classroomData.roomName} was successfully saved`
                        );

                        // Fetch the classroom by name
                        const getClassroomRes = await getClassroomByName(classroomData.roomName);
                        const classroom = getClassroomRes.data;
                        console.log(classroom);
                        setClassroom(classroom); // Optional: if you want to store it in state

                        // Assign the classroom ID to classData
                        classData.classroomId = classroom.id;

                        // Save the class with the assigned classroom ID
                        const classRes = await saveClass(classData);
                        console.log(classRes);
                        successNotification(
                            "Class saved",
                            `${classData.name} was successfully saved`
                        );
                    } catch (err) {
                        console.log(err);
                        errorNotification(
                            err.code,
                            err.response?.data?.message
                        );
                    }
                }
            }}


        >
            {({ isValid, isSubmitting, setFieldValue, values }) => (
                <Form>
                    <Box borderWidth="1px" rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" maxWidth={600} p={6} m="10px auto">
                        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated />
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
                                                {classroom.roomName}
                                            </option>
                                        ))}
                                    </MySelect>
                                ) : (
                                    <>
                                        <MyTextInput name="roomName" type="text" placeholder="Room Name" />
                                        <MyTextInput name="location" type="text" placeholder="Class Location" />
                                        <MyTextInput name="capacity" type="number" placeholder="Class Capacity" />
                                    </>
                                )}
                            </>
                        )}
                        <ButtonGroup mt="5%" w="100%">
                            <Flex w="100%" justifyContent="space-between">
                                <Button onClick={() => { setStep(step - 1); setProgress(progress - 50); }} isDisabled={step === 1} colorScheme="teal" variant="solid" w="7rem" mr="5%">Back</Button>
                                <Button w="7rem" isDisabled={step === 2} onClick={() => { setStep(step + 1); setProgress(100); }} colorScheme="teal" variant="outline">Next</Button>
                                {step === 2 && (
                                    <Button w="7rem" colorScheme="red" variant="solid" isLoading={isSubmitting} type="submit" isDisabled={!isValid || isSubmitting}>
                                        Submit
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
