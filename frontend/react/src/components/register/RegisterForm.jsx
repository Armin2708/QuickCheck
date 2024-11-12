import { useEffect, useState } from "react";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Stack,
    Progress, Spinner,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { saveUser, verifyCode, verifyEmail } from "../../services/client.js";
import { errorNotification, successNotification } from "../../services/notification.js";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import MyTextInput from "../shared/form/MyText.jsx";
import MySelect from "../shared/form/MySelect.jsx";

const RegisterForm = ({ initialStep = 1,token , onSuccess}) => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [step, setStep] = useState(initialStep);
    const [progress, setProgress] = useState((initialStep / 4) * 100);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const [initialValues, setInitialValues] = useState({
        name: '',
        address: '',
        email: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        verificationCode: '',
    });

    const stepValidationSchema = (step) => {
        switch (step) {
            case 1:
                return Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required'),
                });
            case 2:
                return Yup.object({
                    verificationCode: Yup.string().required("Verification code is required"),
                });
            case 3:
                return Yup.object({
                    password: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
                });
            case 4: // Final step, validate all required fields
                return Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required'),
                    verificationCode: Yup.string().required("Verification code is required"),
                    password: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
                    name: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
                    address: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
                    dateOfBirth: Yup.date().required('Required'),
                    gender: Yup.string().oneOf(['MALE', 'FEMALE'], 'Invalid gender').required('Required'),
                });
            default:
                return Yup.object();
        }
    };

    // Check URL parameters on initial load and set default values for step and token
    useEffect(() => {
        if (initialStep === 2 && token) {
            setStep(2);
            setProgress(50);
        }
    }, [initialStep, token]);

    const handleSendEmailVerification = (emailRequest) => {
        setIsLoading(true)
        verifyEmail(emailRequest)
            .then(() => {
                successNotification(
                    "Verification Email Sent",
                    "Please check your email for the verification code."
                )
                setStep(2);
                setProgress(50);
            })
            .catch((err) => {
                errorNotification(
                    err.code,
                    err.response?.data?.message
                );
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    const handleVerifyCode = (token, email, code) => {
        verifyCode({ token, email, code })
            .then((res) => {
                setIsVerified(true);
                setInitialValues((prevValues) => ({
                    ...prevValues,
                    email: res.data.email || prevValues.email,
                }));
                successNotification(
                    "Email Verified",
                    "Your email has been successfully verified."
                );
                setStep(3);
                setProgress(75);
            })
            .catch((err) => {
                errorNotification(
                    err.code,
                    err.response?.data?.message
                );
            })
    };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize // Allows Formik to use updated initialValues
            validationSchema={stepValidationSchema(step)}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                if (step === 1) {
                    // Step 1: Send email verification
                    try {
                        const emailRequest = {
                            email: values.email,
                            url: `${import.meta.env.VITE_REACT_BASE_URL}/register?step=verify`,
                        };
                        await handleSendEmailVerification(emailRequest);
                    } catch (error) {
                        setSubmitting(false);
                    }
                } else if (step === 2) {
                    // Step 2: Verify the code
                    await handleVerifyCode(token, values.email, values.verificationCode);
                    setSubmitting(false);
                } else if (step === 3) {
                    setStep(4);
                    setProgress(100);
                    setSubmitting(false);
                } else if (step === 4) {
                    saveUser({
                            name: values.name,
                            address: values.address,
                            email: values.email,
                            password: values.password,
                            dateOfBirth: values.dateOfBirth,
                            gender: values.gender,
                    })
                        .then(() => {
                            successNotification(
                                "Account Created",
                                `${values.name} was successfully registered.`
                            );
                            login({ username: values.email, password: values.password })
                                .then(() => {
                                    navigate("/dashboard");
                                })
                        })
                        .catch((err) => {
                            errorNotification(
                                err.code,
                                err.response?.data?.message
                            );
                        })
                        .finally(() => {
                            setSubmitting(false);
                        })
                    }
                }
            }
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Box rounded="lg" maxWidth={500} p={6} m="10px auto">
                        <Progress borderRadius={"4px"} value={progress} mb={5} colorScheme={"purple"} />
                        {step === 1 ? (
                            <Stack spacing="4px">
                                <MyTextInput name="email" type="email" placeholder="Email" />
                            </Stack>
                        ) : step === 2 ? (
                            <>
                                <Alert status="info" mt={4} borderRadius={"6px"} colorScheme={"purple"}>
                                    <AlertIcon />
                                    A verification code has been sent to your email.
                                </Alert>
                                <MyTextInput name="verificationCode" type="number" placeholder="Enter Verification Code" />
                            </>
                        ) : step === 3 ? (
                            <MyTextInput name="password" type="password" placeholder="Password" />
                        ) : (
                            <Stack spacing="4px">
                                <MyTextInput name="name" type="text" placeholder="Name" />
                                <MyTextInput name="address" type="text" placeholder="Address" />
                                <MyTextInput name="dateOfBirth" type="date" placeholder="Date of Birth" />
                                <MySelect name="gender">
                                    <option value="">Select gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </MySelect>
                            </Stack>
                        )}

                        <Stack direction="row" width="100%" mt={6}>
                            {step > 1 && (
                                <Button
                                    backgroundColor="#F9F9F9"
                                    variant="solid"
                                    textColor="#707070"
                                    width="100%"
                                    onClick={() => {
                                        setStep(step - 1);
                                        setProgress(((step - 1) / 4) * 100);
                                    }}
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                width="100%"
                                backgroundColor="#7E3BB5"
                                variant="solid"
                                textColor="#FFFFFF"
                            >
                                {isLoading ? (<Spinner/>) : (step===2 ? "Verify" : (step===4 ?"Submit" : "Next"))}
                            </Button>
                        </Stack>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
