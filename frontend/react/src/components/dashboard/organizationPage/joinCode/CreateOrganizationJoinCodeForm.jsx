import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Checkbox,
    FormLabel,
    HStack,
    Text,
    Stack, Input
} from "@chakra-ui/react";
import {useState} from "react";
import {createOrganizationJoinCode} from "../../../../services/client.js";


// Register Form
const CreateOrganizationJoinCodeForm = ({onSuccess,id,fullUser}) => {

    const [code,setCode] = useState()

    const [isUnlimited, setIsUnlimited] = useState(false)
    const [input,setInput] = useState()

    return (
        <Formik
            initialValues={{
                usageLimit: "", // Default to empty
            }}
            validationSchema={Yup.object({
                usageLimit: Yup.number()
                    .integer('Must be an integer')
                    .min(1, 'Must be 30 characters or less'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);

                const payload = {
                    organizationId: id,
                    usageLimit: isUnlimited ? -1 : values.usageLimit, // Use -1 for unlimited
                    creatorId: fullUser?.id,
                };

                console.log(payload);

                createOrganizationJoinCode(payload)
                    .then((res) =>{
                        setCode(res.data)
                        onSuccess();
                        console.log(res.data)
                    }).catch((err) =>{
                    console.log(err)
                }).finally(() => {
                    setSubmitting(false);
                })
            }}
        >
            {({ isValid, isSubmitting, values, setFieldValue }) => (
                <Form>
                    <Stack spacing={"4px"}>
                        <Box>
                            <FormLabel >Usage Limit</FormLabel>
                            <HStack>
                                <Input
                                    type="number"
                                    name="usageLimit"
                                    placeholder="Usage Limit"
                                    value={values.isUnlimited ? "" : values.usageLimit} // Clear when unlimited
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFieldValue("usageLimit", value);
                                        setInput(value)
                                    }}
                                    isDisabled={isUnlimited} // Disable input when unlimited
                                />

                                {/* Checkbox for Unlimited */}
                                <Checkbox
                                    name="isUnlimited"
                                    isChecked={values.isUnlimited}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setIsUnlimited(isChecked);
                                        isChecked ? setInput(-1) : setInput(values.usageLimit)
                                    }}
                                >
                                    Unlimited
                                </Checkbox>
                            </HStack>
                        </Box>
                        <Text fontSize="sm" color="gray.500" paddingLeft={"20px"}>
                            How many times this code can be used.
                        </Text>
                        <Stack direction={"row"} width={"100%"} paddingTop={"20px"}>
                            <Button
                                type={"submit"}
                                disabled={!isValid || isSubmitting || (!input)}
                                backgroundColor={"#7E3BB5"}
                                variant={'solid'}
                                textColor={"#FFFFFF"}
                            >
                                Create Code
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default CreateOrganizationJoinCodeForm;