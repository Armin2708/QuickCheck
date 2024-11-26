import {
    Button, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {createOrganizationJoinCode} from "../../../../services/client.js";
import React, {useEffect, useState} from "react";

export default function CreateOrganizationJoinCode({id, name, fullUser, addCode}){


    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>

                        <FormControl mt={4}>
                            <FormLabel>Code Usage Limit</FormLabel>
                            <HStack>
                                <Input
                                    isDisabled={isUnlimited}
                                    type={"number"}
                                    placeholder='Usage Limit'
                                    onChange={(e)=> {
                                        const value = e.target.value;

                                        // Allow only positive integers
                                        if (/^[1-9]\d*$/.test(value) || value === "") {
                                            setUsageLimitValue(value);
                                            setInputValue(value);
                                        }
                                    }}
                                />
                                <Checkbox
                                    onChange={(e)=>{
                                        setIsUnlimited(e.target.checked);
                                        if (e.target.checked) {
                                            setUsageLimitValue(-1);
                                        }
                                        else {
                                            setUsageLimitValue(inputValue)
                                        }
                                    }}
                                >Unlimited</Checkbox>
                            </HStack>
                            {!isUnlimited && usageLimitValue <= 0 && (
                                <FormErrorMessage color={"red"}>
                                    Please enter a positive integer greater than 0.
                                </FormErrorMessage>
                            )}
                            <FormHelperText>
                                How many times this code can be used.
                            </FormHelperText>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            isDisabled={!usageLimitValue}
                            colorScheme='blue'
                            mr={3}
                            onClick={()=>{
                                console.log(usageLimitValue)
                            }}
                        >
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}