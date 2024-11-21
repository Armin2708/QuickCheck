import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
    Box, Button, Heading, Stack
} from '@chakra-ui/react';
import {useParams} from "react-router-dom";
import {saveChat} from "../../../../services/client.js";
import {errorNotification, successNotification} from "../../../../services/notification.js";
import MyTextInput from "../../../shared/formFields/MyText.jsx";

export default function CreateChatForm({onSuccess}) {
    const { id:classId } = useParams();

    return (
        <Formik
            initialValues={{
                name: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
            })}
            onSubmit={(values, actions) => {

                const chatData = {
                    name: values.name,
                    classId: classId
                };

                saveChat(chatData)
                    .then((res)=>{
                        successNotification(
                            "Chat Created",
                            `${chatData.name} was successfully created`
                        );
                        onSuccess();
                    })
                    .catch ((err)=> {
                        console.log(err);
                        errorNotification(
                            err.code,
                            err.response?.data?.message
                        );
                    })
            }}
        >
            {({ isValid, isSubmitting, setFieldValue, values }) => (
                <Form>
                    <Box borderWidth="1px" rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" maxWidth={600} p={6} m="10px auto">

                        <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">Create Chat</Heading>
                        <Stack spacing="4px">
                            <MyTextInput name="name" type="text" placeholder="Chat Name"/>
                        </Stack>
                        <Button w="7rem" colorScheme="red" variant="solid" isLoading={isSubmitting} type="submit"
                                isDisabled={!isValid || isSubmitting}>
                            Submit
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
