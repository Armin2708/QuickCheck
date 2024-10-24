import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {saveUser, verifyCode, verifyEmail} from "../../services/client.js"
import {errorNotification, successNotification} from "../../services/notification.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const MySelect = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

// Register Form
const RegisterForm = ({onSuccess}) => {

    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState("");  // State for storing the code input

    const handleEmailVerification = async (user) => {
        try {
            // Step 1: Trigger the email verification
            await verifyEmail(user.email);
            alert('A verification code has been sent to your email. Please enter it to continue.');

            // Step 2: Loop until the code is valid
            let isValid = false;
            while (!isValid) {
                // Step 3: Prompt the user for the verification code
                const inputCode = prompt("Enter the verification code (or cancel to stop):");

                // Break out of the loop if the user cancels
                if (inputCode === null) {
                    return false;
                }

                // Step 4: Verify the entered code
                const verifyCodeRequest = {
                    email: user.email,
                    code: inputCode
                };
                const verifyResponse = await verifyCode(verifyCodeRequest);

                if (verifyResponse.data) {
                    // Code is valid, break the loop
                    isValid = true;
                } else {
                    // Notify the user and ask for the code again
                    alert('Invalid verification code, please try again.');

                    // Ask the user if they want to resend the code
                    const resend = confirm("Would you like to resend the verification code?");
                    if (resend) {
                        // Resend the code and continue the loop
                        await verifyEmail(user.email);
                        alert('A new verification code has been sent to your email.');
                    }
                }
            }

            // Return true if verification was successful
            return true;

        } catch (err) {
            console.error(err);
            errorNotification(
                err.code || "Error",
                err.response?.data?.message || err.message || "An error occurred during verification."
            );
            return false;
        }
    };

    return (
        <Formik
            initialValues={{
                schoolName: '',
                name: '',
                address: '',
                email: '',
                password: '',
                dateOfBirth: '',
                gender: '',
                roles: '',
            }}
            validationSchema={Yup.object({
                schoolName: Yup.string()
                    .max(30, 'Must be 30 characters or less')
                    .required('Required'),
                name: Yup.string()
                    .max(30, 'Must be 30 characters or less')
                    .required('Required'),
                address: Yup.string()
                    .max(30, 'Must be 30 characters or less')
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                dateOfBirth: Yup.date().required('Required'),
                gender: Yup.string()
                    .oneOf(['MALE', 'FEMALE'], 'Invalid gender')
                    .required('Required'),
                roles: Yup.string()
                    .oneOf(['USER', 'ADMIN'], 'Invalid Roles')
                    .required('Required'),
            })}
            onSubmit={async (user, {setSubmitting}) => {
                setSubmitting(true);
                user = {
                    ...user,
                    roles: Array.isArray(user.roles) ? user.roles : [user.roles],
                };

                try {
                    // Step 1: Perform email verification with loop
                    const isVerified = await handleEmailVerification(user);

                    // Step 2: If verification succeeds, save the user
                    if (isVerified) {
                        const res = await saveUser(user);

                        console.log(res);
                        successNotification(
                            "Customer saved",
                            `${user.name} was successfully saved`
                        );
                        onSuccess(res.headers["authorization"]);
                    } else {
                        throw new Error("Verification failed");
                    }

                } catch (err) {
                    console.error(err);
                    errorNotification(
                        err.code || "Error",
                        err.response?.data?.message || err.message || "An error occurred"
                    );
                } finally {
                    setSubmitting(false);
                    navigate("/login");
                }
            }}
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Stack spacing={"4px"}>
                        <MyTextInput name="schoolName" type="text" placeholder="School Name" />
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
                        <MySelect name="roles">
                            <option value="">Select Role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </MySelect>
                        <Stack direction={"row"} width={"100%"}>
                            <Button
                                backgroundColor={"#F9F9F9"}
                                variant={'solid'}
                                textColor={"#707070"}
                                width={"100%"}
                                onClick={() => navigate("/login")}
                            >
                                Login
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
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;