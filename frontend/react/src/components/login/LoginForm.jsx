import {Form, Formik, useField} from "formik";
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Stack} from "@chakra-ui/react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {errorNotification} from "../../services/notification.js";
import MyTextInput from "../shared/form/MyText.jsx";

const LoginForm = () =>{

    const {login} = useAuth();
    const navigate = useNavigate();

    return (
        <Formik
            validateOnMount={true}
            validationSchema={
                Yup.object({
                        username: Yup.string()
                            .email("Must be valid email")
                            .required("Email is required"),
                        password: Yup.string()
                            .max(20, "Password cannot be more than 20 characters")
                            .required("Password is required")
                    }
                )}
            initialValues={{username: '', password:''}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                login(values).then(res => {
                    navigate("/dashboard");
                    console.log("Successfully logged in");
                }).catch(err => {
                    errorNotification(
                        err.code,
                        err.response.data.message
                    )
                }).finally(() => {
                    setSubmitting(false);
                })
            }}
        >

            {({isValid, isSubmitting}) => (
                <Form>
                    <Stack spacing={5}>
                        <MyTextInput
                            name={"username"}
                            type={"email"}
                            placeholder={"Email"}
                        />
                        <MyTextInput
                            name={"password"}
                            type={"password"}
                            placeholder={"Password"}
                        />

                        <Stack direction={"row"} width={"100%"}>
                            <Button
                                backgroundColor={"#F9F9F9"}
                                variant={'solid'}
                                textColor={"#707070"}
                                width={"100%"}
                                onClick={() => navigate("/register")}
                            >
                                Sign up
                            </Button>
                            <Button
                                type={"submit"}
                                disabled={!isValid || isSubmitting}
                                width={"100%"}
                                backgroundColor={"#7E3BB5"}
                                variant={'solid'}
                                textColor={"#FFFFFF"}
                                width={"100%"}
                            >
                                Login
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}

        </Formik>
    )
}

export default LoginForm;