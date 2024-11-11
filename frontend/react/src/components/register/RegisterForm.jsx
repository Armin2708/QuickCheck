import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Stack,
    Progress,
    Heading,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { saveUser, verifyCode, verifyEmail } from "../../services/client.js";
import { errorNotification, successNotification } from "../../services/notification.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx"; // import your Auth context
import MyTextInput from "../shared/form/MyText.jsx";
import MySelect from "../shared/form/MySelect.jsx";

const RegisterForm = ({initialStep = 1}) => {
    const navigate = useNavigate();
    const { login } = useAuth();  // use the login function from context
    const [step, setStep] = useState(initialStep); // Set initial step based on the prop
    const [progress, setProgress] = useState(initialStep === 2 ? 100 : 50);

    const handleEmailVerification = async (emailRequest) => {
        try {
            await verifyEmail(emailRequest);
            successNotification("Verification Email Sent", "Please check your email for the verification code.");
        } catch (err) {
            errorNotification(err.code || "Error", err.response?.data?.message || "Failed to send verification email.");
            throw err;
        }
    };

    const handleVerificationCode = async (email, code) => {
        try {
            const response = await verifyCode({ email, code });
            if (response.data) {
                successNotification("Email Verified", "Your email has been successfully verified.");
                return true;
            } else {
                errorNotification("Invalid Code", "The verification code is incorrect.");
                return false;
            }
        } catch (err) {
            errorNotification(err.code || "Error", err.response?.data?.message || "Verification failed.");
            return false;
        }
    };

    return (
        <Formik
            initialValues={{
                name: '',
                address: '',
                email: '',
                password: '',
                dateOfBirth: '',
                gender: '',
                verificationCode: '',
            }}
            validationSchema={
                step === 1
                    ? Yup.object({
                        name: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
                        address: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
                        email: Yup.string().email('Invalid email address').required('Required'),
                        password: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
                        dateOfBirth: Yup.date().required('Required'),
                        gender: Yup.string().oneOf(['MALE', 'FEMALE'], 'Invalid gender').required('Required'),
                    })
                    : Yup.object({
                        verificationCode: Yup.string().required("Verification code is required"),
                    })
            }
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                if (step === 1) {
                    try {
                        const emailRequest = {
                            email:values.email,
                            url:`${import.meta.env.VITE_FRONT_URL}/register?step=verify`
                        }
                        console.log(`link : ${import.meta.env.VITE_FRONT_URL}/register?step=verify`)
                        console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
                        console.log("Frontend Base URL:", import.meta.env.VITE_FRONT_URL);
                        console.log("Google Map API Key:", import.meta.env.VITE_GOOGLE_MAP_API_KEY);

                        await handleEmailVerification(emailRequest);
                        setStep(2);
                        setProgress(100);
                    } catch (error) {
                        setSubmitting(false);
                    }
                } else if (step === 2) {
                    const isVerified = await handleVerificationCode(values.email, values.verificationCode);
                    if (isVerified) {
                        try {
                            // Register the user
                            const res = await saveUser({
                                name: values.name,
                                address: values.address,
                                email: values.email,
                                password: values.password,
                                dateOfBirth: values.dateOfBirth,
                                gender: values.gender,
                            });
                            successNotification("Account Created", `${values.name} was successfully registered.`);

                            // Automatically log in the user
                            await login({ username: values.email, password: values.password });
                            navigate("/dashboard");
                        } catch (err) {
                            errorNotification(err.code || "Error", err.response?.data?.message || "Registration failed.");
                        } finally {
                            setSubmitting(false);
                        }
                    }
                }
            }}
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Box rounded="lg"  maxWidth={500} p={6} m="10px auto">
                        <Progress borderRadius={"4px"} value={progress} mb={5} colorScheme={"purple"}  />
                        {step === 1 ? (
                            <>
                                <Stack spacing="4px">
                                    <MyTextInput name="name" type="text" placeholder="Name" />
                                    <MyTextInput name="address" type="text" placeholder="Address" />
                                    <MyTextInput name="email" type="email" placeholder="Email" />
                                    <MyTextInput name="password" type="password" placeholder="Password" />
                                    <MyTextInput name="dateOfBirth" type="date" placeholder="Date of Birth" />
                                    <MySelect name="gender">
                                        <option value="">Select gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </MySelect>
                                </Stack>
                            </>
                        ) : (
                            <>
                                <Alert status="info" mt={4} borderRadius={"6px"} colorScheme={"purple"}>
                                    <AlertIcon />
                                    A verification code has been sent to your email.
                                </Alert>
                                <MyTextInput name="verificationCode" type="number" placeholder="Enter Verification Code" />
                            </>
                        )}

                        <Stack direction="row" width="100%" mt={6}>
                            {step === 2 ? (
                                <Button
                                    backgroundColor="#F9F9F9"
                                    variant="solid"
                                    textColor="#707070"
                                    width="100%"
                                    onClick={() => {
                                        setStep(1);
                                        setProgress(50);
                                    }}
                                >
                                    Back
                                </Button>
                            ) :
                                (<Button
                                    backgroundColor="#F9F9F9"
                                    variant="solid"
                                    textColor="#707070"
                                    width="100%"
                                    onClick={() => {
                                        navigate("/login")
                                    }}
                                >
                                    Login
                                </Button>)
                            }
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                width="100%"
                                backgroundColor="#7E3BB5"
                                variant="solid"
                                textColor="#FFFFFF"
                            >
                                {step === 1 ? "Submit" : "Verify"}
                            </Button>
                        </Stack>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
